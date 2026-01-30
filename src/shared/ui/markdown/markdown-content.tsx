"use client";

import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
  leadParagraph?: boolean;
}

export function MarkdownContent({
  content,
  className,
  leadParagraph = false,
}: MarkdownContentProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="pt-2 text-base font-semibold text-foreground sm:text-lg">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="pt-2 text-sm font-semibold text-foreground sm:text-base">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary/60 sm:text-base">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground marker:text-primary/60 sm:text-base">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    a: ({ href, children, ...props }) => (
      <a
        {...props}
        href={href}
        className={cn(
          "font-semibold text-primary underline-offset-4 hover:underline",
          props.className
        )}
        target={href?.startsWith("/") ? undefined : "_blank"}
        rel={href?.startsWith("/") ? undefined : "noreferrer"}
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="rounded-xl border border-border/60 bg-muted/15 p-4 text-sm text-muted-foreground sm:text-base">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-4 border-border/60" />,
    code: ({ children }) => (
      <code className="rounded-md border border-border/60 bg-muted/20 px-1 py-0.5 text-[0.9em] text-foreground">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="overflow-x-auto rounded-xl border border-border/60 bg-muted/15 p-4 text-xs text-foreground">
        {children}
      </pre>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="text-foreground/90 italic">{children}</em>
    ),
  };

  return (
    <div
      className={cn(
        "space-y-4",
        leadParagraph && "[&>p:first-child]:!font-medium",
        leadParagraph && "[&>p:first-child]:!text-foreground",
        className
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
