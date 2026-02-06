"use client";

import React from "react";
import type { ComponentProps, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  TelegramIcon,
  VKIcon,
  MailIcon,
} from "@/components/ui/footer-social-icons";

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
      {
        title: "Telegram",
        href: "https://t.me/artemgoryanskiy",
        icon: TelegramIcon,
      },
      {
        title: "ВКонтакте",
        href: "https://vk.com/standartstudy",
        icon: VKIcon,
      },
      {
        title: "Email",
        href: "mailto:info@standart82.ru",
        icon: MailIcon,
      },
    ],
  },
];

function isExternal(href: string): boolean {
  return href.startsWith("http") || href.startsWith("mailto:");
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "relative w-full flex flex-col items-center justify-center",
        "rounded-t-2xl border-t border-border/60 bg-background md:rounded-t-3xl",
        "bg-linear-to-b from-foreground/4 to-transparent",
        "py-12 lg:py-16"
      )}
    >
      <div className="bg-foreground/20 absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
        <AnimatedContainer className="space-y-4">
          <Link
            href="/"
            className="inline-block transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            aria-label="На главную"
          >
            <Image
              src="/logo-full.svg"
              alt="ООО ЦОК СТАНДАРТ ПЛЮС"
              width={140}
              height={48}
              sizes="140px"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="mt-6 text-sm text-muted-foreground md:mt-0">
            © {year} ООО ЦОК «СТАНДАРТ ПЛЮС». Все права защищены.
          </p>
        </AnimatedContainer>

        <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
          {footerLinks.map((section, index) => (
            <AnimatedContainer
              key={section.label}
              delay={0.1 + index * 0.1}
              className="mb-10 md:mb-0"
            >
              <h3 className="text-xs font-semibold text-foreground">
                {section.label}
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {section.links.map((link) => {
                  const Icon = link.icon;
                  const content = (
                    <>
                      {Icon && (
                        <Icon className="me-1.5 size-4 shrink-0 opacity-80" />
                      )}
                      {link.title}
                    </>
                  );
                  return (
                    <li key={link.title}>
                      {isExternal(link.href) ? (
                        <a
                          href={link.href}
                          target={
                            link.href.startsWith("mailto:") ? undefined : "_blank"
                          }
                          rel={
                            link.href.startsWith("mailto:")
                              ? undefined
                              : "noopener noreferrer"
                          }
                          className="inline-flex items-center transition-all duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                        >
                          {content}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="inline-flex items-center transition-all duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </AnimatedContainer>
          ))}
        </div>
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
