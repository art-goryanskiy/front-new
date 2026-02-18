"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileCheck, FileText } from "lucide-react";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { Surface } from "@/shared/ui/surface/surface";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CONTACT_DOCUMENTS } from "./contacts-data";
import { cn } from "@/lib/utils";

/**
 * Блок документов: плитка без превью, по клику — лайтбокс с изображением целиком.
 */
export function ContactsDocuments() {
  const [lightboxHref, setLightboxHref] = useState<string | null>(null);
  const [lightboxTitle, setLightboxTitle] = useState<string>("");

  const openLightbox = (href: string, title: string) => {
    setLightboxTitle(title);
    setLightboxHref(href);
  };

  const closeLightbox = () => {
    setLightboxHref(null);
    setLightboxTitle("");
  };

  return (
    <>
      <section className="relative" aria-labelledby="documents-heading">
        <BlurGlowBackground
          spots={[
            { position: "top-left", color: "bg-primary/10" },
            { position: "bottom-right", color: "bg-emerald-500/10" },
            { position: "top-right", color: "bg-amber-500/5", size: "small" },
          ]}
        />
        <Surface
          variant="floating"
          className="relative z-10 overflow-hidden p-6 sm:p-8 lg:p-10"
        >
          <header className="mb-8 text-center sm:mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_15%,transparent)]">
              <FileCheck className="h-7 w-7" aria-hidden />
            </div>
            <h2
              id="documents-heading"
              className="mt-5 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Документы
            </h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Лицензии, свидетельства и заключения
            </p>
            <div className="mx-auto mt-5 h-px w-20 rounded-full bg-primary/30" />
          </header>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DOCUMENTS.map((doc, index) => (
              <motion.div
                key={doc.href}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
              >
                <motion.button
                  type="button"
                  onClick={() => openLightbox(doc.href, doc.title)}
                  className={cn(
                    "group relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card/60 p-4 text-left",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                    },
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={false}
                >
                  {/* Блик при наведении */}
                  <span
                    className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                    aria-hidden
                  />
                  {/* Подсветка по границе */}
                  <span
                    className="pointer-events-none absolute inset-0 z-0 rounded-2xl opacity-0 shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_12px_40px_-8px_hsl(var(--primary)/0.25)] transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                    <motion.span
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      whileHover={{ rotate: 5, scale: 1.08 }}
                    >
                      <FileText className="h-6 w-6" aria-hidden />
                    </motion.span>
                  </span>
                  <span className="relative z-10 min-w-0 flex-1 text-sm font-medium text-foreground transition-colors duration-300 group-hover:text-foreground sm:text-base">
                    {doc.title}
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
        </Surface>
      </section>

      <Dialog open={!!lightboxHref} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          showClose={true}
          className="max-h-[90vh] max-w-[90vw] border-0 bg-black/90 p-0 shadow-2xl"
          aria-describedby={undefined}
        >
          {lightboxHref && (
            <>
              <DialogTitle className="sr-only">{lightboxTitle}</DialogTitle>
              <div className="flex max-h-[90vh] max-w-[90vw] items-center justify-center p-4">
                <Image
                  src={lightboxHref}
                  alt={lightboxTitle}
                  width={1200}
                  height={900}
                  className="max-h-[85vh] max-w-full object-contain"
                />
              </div>
              <p className="border-t border-white/10 px-4 py-3 text-center text-sm text-white/80">
                {lightboxTitle}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
