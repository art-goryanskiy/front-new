"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";

interface FooterLink {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
  label: string;
  links: FooterLink[];
}

const footerLinks: FooterSection[] = [
  {
    label: "Программы",
    links: [
      { title: "Главная", href: "/" },
      { title: "Повышение квалификации", href: "/qualification-upgrade" },
      { title: "Проф. переподготовка", href: "/professional-retraining" },
      { title: "Проф. обучение", href: "/professional-education" },
    ],
  },
  {
    label: "Кабинет",
    links: [
      { title: "Корзина", href: "/cart" },
      { title: "Мои заказы", href: "/orders" },
      { title: "Профиль", href: "/profile" },
    ],
  },
  {
    label: "Документы",
    links: [
      { title: "Политика конфиденциальности", href: "/privacy" },
      { title: "Пользовательское соглашение", href: "/terms" },
    ],
  },
  {
    label: "Соцсети",
    links: [
      { title: "Telegram", href: "https://t.me/artemgoryanskiy", icon: Send },
      { title: "ВКонтакте", href: "https://vk.com/standartstudy", icon: MessageCircle },
      { title: "Email", href: "mailto:info@standart82.ru", icon: Mail },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mx-auto w-full max-w-7xl flex flex-col items-center justify-center rounded-t-2xl border-t border-border/60 bg-background px-6 py-12 lg:py-16 md:rounded-t-3xl bg-gradient-to-b from-foreground/[0.04] to-transparent">
      <div className="bg-foreground/20 absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <GraduationCap className="size-8 text-primary" />
          <p className="mt-8 text-sm text-muted-foreground md:mt-0">
            © {year} ООО ЦОК «СТАНДАРТ ПЛЮС». Все права защищены.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer
              key={section.label}
              delay={0.1 + index * 0.1}
            >
              <div className="mb-10 md:mb-0">
                <h3 className="text-xs font-semibold text-foreground">
                  {section.label}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {section.links.map((link) => {
                    const isExternal =
                      link.href.startsWith("http") ||
                      link.href.startsWith("mailto:");
                    const content = (
                      <>
                        {link.icon && (
                          <link.icon className="me-1 size-4 shrink-0" />
                        )}
                        {link.title}
                      </>
                    );
                    return (
                      <li key={link.title}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                            rel={
                              link.href.startsWith("mailto:")
                                ? undefined
                                : "noopener noreferrer"
                            }
                            className="inline-flex items-center transition-all duration-300 hover:text-foreground"
                          >
                            {content}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-flex items-center transition-all duration-300 hover:text-foreground"
                          >
                            {content}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
