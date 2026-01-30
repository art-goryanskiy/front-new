"use client";

import {
  JSX,
  memo,
  type KeyboardEvent,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { MarkdownContent } from "@/shared/ui/markdown/markdown-content";

export interface MarkdownFieldProps<
  TFieldValues extends FieldValues = FieldValues,
> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  minRows?: number;
  className?: string;
  description?: string;
  isDisabled?: boolean;
}

function applyWrap(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  wrapStart: string,
  wrapEnd: string,
  placeholder: string
) {
  const hasSelection = selectionEnd > selectionStart;
  const selected = hasSelection
    ? value.slice(selectionStart, selectionEnd)
    : placeholder;
  const before = value.slice(0, selectionStart);
  const after = value.slice(selectionEnd);
  const next = `${before}${wrapStart}${selected}${wrapEnd}${after}`;
  const nextSelectionStart = selectionStart + wrapStart.length;
  const nextSelectionEnd = nextSelectionStart + selected.length;
  return { next, nextSelectionStart, nextSelectionEnd };
}

function applyLinePrefix(
  value: string,
  selectionStart: number,
  selectionEnd: number,
  prefix: string
) {
  const before = value.slice(0, selectionStart);
  const selected = value.slice(selectionStart, selectionEnd);
  const after = value.slice(selectionEnd);

  const target = selected.length ? selected : "";
  const lines = (target || value.slice(selectionStart)).split("\n");

  const prefixed = lines
    .map((l) => (l.trim() ? `${prefix}${l}` : l))
    .join("\n");

  if (selected.length) {
    const next = `${before}${prefixed}${after}`;
    return { next, caret: selectionStart + prefixed.length };
  }

  const next = `${before}${prefix}${after}`;
  return { next, caret: selectionStart + prefix.length };
}

export const MarkdownField = memo(function MarkdownField<
  TFieldValues extends FieldValues = FieldValues,
>({
  control,
  name,
  label,
  placeholder,
  minRows = 4,
  className = "w-full",
  description,
  isDisabled,
}: MarkdownFieldProps<TFieldValues>) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dialogTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandedPreview, setIsExpandedPreview] = useState(true);

  const toolbarHint = useMemo(
    () =>
      "Поддерживает Markdown: **жирный**, *курсив*, списки, заголовки, ссылки.",
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value = (field.value as string | undefined) ?? "";
        const valueLines = value ? value.split("\n").length : 0;
        const valueChars = value.length;

        const handleEditorKeyDown = (
          e: KeyboardEvent<HTMLTextAreaElement>
        ) => {
          const el = e.currentTarget;

          // Hotkeys (Cmd/Ctrl)
          if (e.metaKey || e.ctrlKey) {
            const k = e.key.toLowerCase();
            if (k === "b") {
              e.preventDefault();
              wrap("**", "**", "жирный текст", el);
              return;
            }
            if (k === "i") {
              e.preventDefault();
              wrap("*", "*", "курсив", el);
              return;
            }
            if (k === "k") {
              e.preventDefault();
              wrap("[", "](https://)", "текст ссылки", el);
              return;
            }
          }

          // Smart list continuation
          if (e.key !== "Enter" || e.shiftKey) return;

          const start = el.selectionStart ?? 0;
          const end = el.selectionEnd ?? 0;
          if (start !== end) return; // keep default behavior on multiline selection

          const lineStart = value.lastIndexOf("\n", start - 1) + 1;
          const lineEnd = value.indexOf("\n", start);
          const currentLine =
            lineEnd === -1
              ? value.slice(lineStart)
              : value.slice(lineStart, lineEnd);

          const bulletMatch = currentLine.match(
            /^(\s*)([-*]|•)\s+(.*)$/
          );
          const orderedMatch = currentLine.match(
            /^(\s*)(\d{1,2})([.)])\s+(.*)$/
          );

          // If current line is a list item and cursor is at end of the line, continue it.
          // Also support "empty item" -> exit list.
          if (bulletMatch) {
            const indent = bulletMatch[1] ?? "";
            const marker = bulletMatch[2] ?? "-";
            const rest = (bulletMatch[3] ?? "").trim();

            // Exit list on empty item
            if (!rest) {
              e.preventDefault();
              const before = value.slice(0, lineStart);
              const after = value.slice(
                lineStart + currentLine.length
              );
              const cleanedLine = "";
              const next = `${before}${cleanedLine}\n${indent}${after.replace(/^\n?/, "")}`;
              const caret = before.length + 1 + indent.length;
              commit(next, caret, el);
              return;
            }

            e.preventDefault();
            const insert = `\n${indent}${marker} `;
            const next = `${value.slice(0, start)}${insert}${value.slice(start)}`;
            const caret = start + insert.length;
            commit(next, caret, el);
            return;
          }

          if (orderedMatch) {
            const indent = orderedMatch[1] ?? "";
            const num = Number(orderedMatch[2] ?? "1");
            const delim = orderedMatch[3] ?? ".";
            const rest = (orderedMatch[4] ?? "").trim();

            // Exit list on empty item
            if (!rest) {
              e.preventDefault();
              const before = value.slice(0, lineStart);
              const after = value.slice(
                lineStart + currentLine.length
              );
              const cleanedLine = "";
              const next = `${before}${cleanedLine}\n${indent}${after.replace(/^\n?/, "")}`;
              const caret = before.length + 1 + indent.length;
              commit(next, caret, el);
              return;
            }

            const nextNum = Number.isFinite(num) ? num + 1 : 1;
            e.preventDefault();
            const insert = `\n${indent}${nextNum}${delim} `;
            const next = `${value.slice(0, start)}${insert}${value.slice(start)}`;
            const caret = start + insert.length;
            commit(next, caret, el);
          }
        };

        const commit = (
          next: string,
          caret?: number,
          el?: HTMLTextAreaElement | null
        ) => {
          field.onChange(next);
          queueMicrotask(() => {
            const target = el ?? textareaRef.current;
            if (!target) return;
            if (caret !== undefined) {
              target.focus();
              target.setSelectionRange(caret, caret);
            }
          });
        };

        const wrap = (
          wrapStart: string,
          wrapEnd: string,
          ph: string,
          el?: HTMLTextAreaElement | null
        ) => {
          const target = el ?? textareaRef.current;
          if (!target) return;
          const { next, nextSelectionStart, nextSelectionEnd } =
            applyWrap(
              value,
              target.selectionStart ?? 0,
              target.selectionEnd ?? 0,
              wrapStart,
              wrapEnd,
              ph
            );
          field.onChange(next);
          queueMicrotask(() => {
            target.focus();
            target.setSelectionRange(
              nextSelectionStart,
              nextSelectionEnd
            );
          });
        };

        const prefix = (
          p: string,
          el?: HTMLTextAreaElement | null
        ) => {
          const target = el ?? textareaRef.current;
          if (!target) return;
          const { next, caret } = applyLinePrefix(
            value,
            target.selectionStart ?? 0,
            target.selectionEnd ?? 0,
            p
          );
          commit(next, caret, target);
        };

        return (
          <div className={cn("space-y-2", className)}>
            <div className="group relative pt-2">
              <Label
                htmlFor={name}
                className={cn(
                  "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                  fieldState.invalid
                    ? "text-destructive"
                    : "text-muted-foreground group-focus-within:text-foreground"
                )}
              >
                {label}
              </Label>

              <div className="rounded-xl border border-border/60 bg-background/60 p-2 backdrop-blur">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                  <div className="flex flex-wrap gap-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() => wrap("**", "**", "жирный текст")}
                    >
                      Жирный
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() => wrap("*", "*", "курсив")}
                    >
                      Курсив
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() => prefix("## ")}
                    >
                      Заголовок
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() => prefix("- ")}
                    >
                      Список
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() => prefix("1. ")}
                    >
                      Шаги
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      disabled={isDisabled}
                      onClick={() =>
                        wrap("[", "](https://)", "текст ссылки")
                      }
                    >
                      Ссылка
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isDisabled}
                      onClick={() => setIsPreview((v) => !v)}
                      className="rounded-xl"
                    >
                      {isPreview ? "Редактировать" : "Превью"}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      disabled={isDisabled}
                      onClick={() => setIsExpanded(true)}
                      className="rounded-xl"
                    >
                      Развернуть
                    </Button>
                  </div>
                </div>

                {isPreview ? (
                  <div className="rounded-lg border border-border/60 bg-background/60 p-3">
                    {value.trim() ? (
                      <MarkdownContent
                        content={value}
                        leadParagraph
                      />
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        Нечего показывать — введите текст.
                      </div>
                    )}
                  </div>
                ) : (
                  <Textarea
                    {...field}
                    ref={(el) => {
                      textareaRef.current = el;
                    }}
                    id={name}
                    value={value}
                    placeholder={placeholder}
                    rows={minRows}
                    lang="ru"
                    spellCheck={true}
                    autoCorrect="on"
                    disabled={isDisabled}
                    aria-invalid={fieldState.invalid}
                    aria-label={label}
                    onKeyDown={handleEditorKeyDown}
                    className="peer max-h-80 min-h-24 resize-y border-0 bg-transparent p-2 focus-visible:ring-0"
                  />
                )}

                {!isPreview && (
                  <div className="mt-2 flex items-center justify-between px-1 text-[11px] font-medium text-muted-foreground">
                    <span>
                      {valueLines > 0 ? `${valueLines} строк` : " "}
                    </span>
                    <span>{valueChars} символов</span>
                  </div>
                )}
              </div>
            </div>

            {(description || toolbarHint) && !fieldState.error && (
              <p className="text-sm text-muted-foreground">
                {description ?? toolbarHint}
              </p>
            )}

            {fieldState.error?.message && (
              <p className="text-sm text-destructive">
                {fieldState.error.message}
              </p>
            )}

            <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
              <DialogContent
                showClose={true}
                className="w-[calc(100vw-1.5rem)] max-w-[84rem] gap-0 overflow-hidden p-0"
              >
                <DialogHeader className="border-b border-border/60 bg-background/70 px-6 py-5 backdrop-blur-xl">
                  <DialogTitle className="text-xl font-bold">
                    {label}
                  </DialogTitle>
                  <DialogDescription>
                    Удобный режим для длинных текстов. Markdown
                    поддерживается.
                  </DialogDescription>
                </DialogHeader>

                <div className="px-6 pt-5 pb-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3">
                    <div className="flex flex-wrap gap-1">
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          wrap(
                            "**",
                            "**",
                            "жирный текст",
                            dialogTextareaRef.current
                          )
                        }
                      >
                        Жирный
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          wrap(
                            "*",
                            "*",
                            "курсив",
                            dialogTextareaRef.current
                          )
                        }
                      >
                        Курсив
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          prefix("## ", dialogTextareaRef.current)
                        }
                      >
                        Заголовок
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          prefix("- ", dialogTextareaRef.current)
                        }
                      >
                        Список
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          prefix("1. ", dialogTextareaRef.current)
                        }
                      >
                        Шаги
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        disabled={isDisabled}
                        onClick={() =>
                          wrap(
                            "[",
                            "](https://)",
                            "текст ссылки",
                            dialogTextareaRef.current
                          )
                        }
                      >
                        Ссылка
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        disabled={isDisabled}
                        onClick={() =>
                          setIsExpandedPreview((v) => !v)
                        }
                        className="rounded-xl"
                      >
                        {isExpandedPreview
                          ? "Скрыть превью"
                          : "Показать превью"}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setIsExpanded(false)}
                        className="rounded-xl"
                      >
                        Готово
                      </Button>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "grid gap-4",
                      isExpandedPreview
                        ? "lg:grid-cols-2"
                        : "grid-cols-1"
                    )}
                  >
                    <div className="rounded-xl border border-border/60 bg-background/60 backdrop-blur">
                      <Textarea
                        {...field}
                        ref={(el) => {
                          dialogTextareaRef.current = el;
                        }}
                        id={`${name}-expanded`}
                        value={value}
                        placeholder={placeholder}
                        rows={Math.max(minRows, 16)}
                        lang="ru"
                        spellCheck={true}
                        autoCorrect="on"
                        disabled={isDisabled}
                        aria-invalid={fieldState.invalid}
                        aria-label={label}
                        onKeyDown={handleEditorKeyDown}
                        className="min-h-[50vh] resize-none border-0 bg-transparent p-3 focus-visible:ring-0"
                      />
                      <div className="flex items-center justify-between border-t border-border/60 px-3 py-2 text-[11px] font-medium text-muted-foreground">
                        <span>
                          {valueLines > 0
                            ? `${valueLines} строк`
                            : " "}
                        </span>
                        <span>{valueChars} символов</span>
                      </div>
                    </div>

                    {isExpandedPreview && (
                      <div className="hidden lg:block">
                        <div className="rounded-xl border border-border/60 bg-background/60 p-4 backdrop-blur">
                          {value.trim() ? (
                            <MarkdownContent
                              content={value}
                              leadParagraph
                            />
                          ) : (
                            <div className="text-sm text-muted-foreground">
                              Нечего показывать — введите текст.
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );
      }}
    />
  );
}) as <TFieldValues extends FieldValues = FieldValues>(
  props: MarkdownFieldProps<TFieldValues>
) => JSX.Element;
