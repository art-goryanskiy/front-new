"use client";

import { useState, useRef, useId } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send,
  CheckCircle2,
  User,
  Phone,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Surface } from "@/shared/ui/surface/surface";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  phone: string;
  program: string;
}

type Status = "idle" | "loading" | "success" | "error";

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon: React.ElementType;
  disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={cn(
          "relative flex items-center overflow-hidden rounded-xl border transition-all duration-200",
          focused
            ? "border-primary shadow-[0_0_0_3px_color-mix(in_srgb,var(--primary)_12%,transparent)]"
            : "border-border/60 hover:border-border/90",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className="pointer-events-none flex h-full w-11 shrink-0 items-center justify-center text-muted-foreground/60 transition-colors duration-200 peer-focus:text-primary">
          <Icon className={cn("h-4 w-4 transition-colors duration-200", focused && "text-primary")} />
        </span>
        <div className="relative flex-1 pr-3">
          <label
            htmlFor={id}
            className={cn(
              "pointer-events-none absolute left-0 origin-left text-muted-foreground transition-all duration-200",
              active
                ? "-translate-y-[0.9rem] scale-[0.75] text-primary/80 font-medium"
                : "translate-y-[0.85rem] scale-100"
            )}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={focused ? placeholder : ""}
            disabled={disabled}
            className="peer block w-full bg-transparent pb-2 pt-6 text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
          />
        </div>
      </div>
    </div>
  );
}

export function ContactsForm() {
  const uid = useId();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  const [form, setForm] = useState<FormState>({ name: "", phone: "", program: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set = (field: keyof FormState) => (v: string) =>
    setForm((prev) => ({ ...prev, [field]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Server error");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message !== "Server error"
          ? err.message
          : "Что-то пошло не так. Попробуйте позвонить нам напрямую."
      );
    }
  };

  const isDisabled = status === "loading" || status === "success";

  return (
    <motion.section
      ref={ref}
      id="request-form"
      className="relative scroll-mt-24"
      aria-labelledby="form-heading"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <BlurGlowBackground
        spots={[
          { position: "top-right", color: "bg-primary/15" },
          { position: "bottom-left", color: "bg-blue-500/10" },
          { position: "top-left", color: "bg-violet-500/8", size: "small" },
        ]}
      />

      <Surface
        variant="floating"
        className="relative z-10 overflow-hidden p-6 sm:p-8 lg:p-12"
      >
        {/* Декоративный градиент в правом углу */}
        <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[520px] rounded-full bg-primary/6 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-[280px] w-[360px] rounded-full bg-blue-500/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl">
          {/* Заголовок */}
          <div className="mb-8 text-center sm:mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_0_32px_color-mix(in_srgb,var(--primary)_18%,transparent)]"
            >
              <Send className="h-7 w-7" aria-hidden />
            </motion.div>
            <h2
              id="form-heading"
              className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
            >
              Оставить заявку
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Перезвоним в течение рабочего дня и ответим на все вопросы
            </p>
            <div className="mx-auto mt-5 h-px w-20 rounded-full bg-primary/30" />
          </div>

          {/* Форма / Success */}
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-4 py-10 text-center"
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 shadow-[0_0_32px_color-mix(in_srgb,rgb(16_185_129)_20%,transparent)]">
                  <CheckCircle2 className="h-10 w-10" />
                </span>
                <div>
                  <p className="text-xl font-bold text-foreground">Заявка отправлена!</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Мы свяжемся с вами в ближайшее рабочее время.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm({ name: "", phone: "", program: "" });
                  }}
                  className="mt-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Отправить ещё одну заявку
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingInput
                    id={`${uid}-name`}
                    label="Ваше имя"
                    placeholder="Иван Иванов"
                    icon={User}
                    value={form.name}
                    onChange={set("name")}
                    disabled={isDisabled}
                  />
                  <FloatingInput
                    id={`${uid}-phone`}
                    label="Телефон"
                    placeholder="+7 (900) 000-00-00"
                    type="tel"
                    icon={Phone}
                    value={form.phone}
                    onChange={set("phone")}
                    disabled={isDisabled}
                  />
                </div>

                <FloatingInput
                  id={`${uid}-program`}
                  label="Программа или направление (необязательно)"
                  placeholder="Например, Охрана труда"
                  icon={BookOpen}
                  value={form.program}
                  onChange={set("program")}
                  disabled={isDisabled}
                />

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-sm text-destructive"
                  >
                    {errorMsg}
                  </motion.p>
                )}

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-muted-foreground">
                    Нажимая «Отправить», вы соглашаетесь с{" "}
                    <a href="/privacy" className="text-primary underline-offset-2 hover:underline">
                      политикой конфиденциальности
                    </a>
                  </p>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isDisabled || !form.name.trim() || !form.phone.trim()}
                    className="shrink-0 gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправка…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Отправить
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Surface>
    </motion.section>
  );
}
