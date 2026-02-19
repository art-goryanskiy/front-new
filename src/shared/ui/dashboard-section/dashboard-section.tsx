import type { ReactNode } from "react";

export function DashboardSection({
  title,
  description,
  actions,
  children,
  suppressTitle,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  /** Когда true, заголовок не рендерится (для вкладок, где заголовок вынесен в sticky) */
  suppressTitle?: boolean;
}) {
  return (
    <section className="space-y-3 sm:space-y-4">
      {!suppressTitle && (
        <div className="flex items-end justify-between gap-3 border-b border-border/40 pb-3 sm:pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
            {description ? (
              <p className="text-sm text-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>
      )}

      {children}
    </section>
  );
}
