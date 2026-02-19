"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileCheck, FileText, X } from "lucide-react";
import { BlurGlowBackground } from "@/shared/ui/blur-glow-background/blur-glow-background";
import { Surface } from "@/shared/ui/surface/surface";
import { MagicCard } from "@/components/ui/magic-card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CONTACT_DOCUMENTS } from "./contacts-data";
import { cn } from "@/lib/utils";

/**
 * Блок документов: плитка без превью, по клику — лайтбокс с изображением целиком.
 */
export function ContactsDocuments() {
  const [lightboxHref, setLightboxHref] = useState<string | null>(
    null
  );
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
      <section
        className="relative"
        aria-labelledby="documents-heading"
      >
        <BlurGlowBackground
          spots={[
            { position: "top-left", color: "bg-primary/10" },
            { position: "bottom-right", color: "bg-emerald-500/10" },
            {
              position: "top-right",
              color: "bg-amber-500/5",
              size: "small",
            },
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DOCUMENTS.map((doc, index) => (
              <motion.div
                key={doc.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="min-w-0 h-full"
              >
                <MagicCard
                  gradientSize={280}
                  gradientFrom="hsl(var(--primary) / 0.4)"
                  gradientTo="hsl(var(--primary) / 0.08)"
                  gradientColor="hsl(var(--primary) / 0.12)"
                  gradientOpacity={0.7}
                  className="h-full border border-border/60 shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <motion.button
                    type="button"
                    onClick={() => openLightbox(doc.href, doc.title)}
                    className={cn(
                      "group/card relative flex w-full items-center gap-5 overflow-hidden p-6 text-left sm:p-7",
                      "rounded-2xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                    )}
                    whileHover={{
                      y: -4,
                      transition: {
                        type: "spring",
                        stiffness: 380,
                        damping: 22,
                      },
                    }}
                    whileTap={{ scale: 0.99 }}
                    initial={false}
                  >
                    {/* Блик при наведении */}
                    <span
                      className="pointer-events-none absolute inset-0 z-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover/card:translate-x-full"
                      aria-hidden
                    />
                    <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover/card:bg-primary/15 sm:h-16 sm:w-16">
                      <FileText
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        aria-hidden
                      />
                    </span>
                    <span className="relative z-10 min-w-0 flex-1 text-base font-medium text-foreground transition-colors duration-300 group-hover/card:text-foreground sm:text-lg">
                      {doc.title}
                    </span>
                  </motion.button>
                </MagicCard>
              </motion.div>
            ))}
          </div>
        </Surface>
      </section>

      <Dialog
        open={!!lightboxHref}
        onOpenChange={(open) => !open && closeLightbox()}
      >
        <DialogContent
          showClose={false}
          overlayClassName="bg-background/80 backdrop-blur-xl"
          className="max-h-[90vh] max-w-[90vw] overflow-hidden border border-border/40 bg-background/95 p-0 shadow-2xl backdrop-blur-sm sm:rounded-2xl"
          aria-describedby={undefined}
        >
          {lightboxHref && (
            <>
              <DialogTitle className="sr-only">
                {lightboxTitle}
              </DialogTitle>
              <DialogClose
                className={cn(
                  "absolute top-3 right-3 z-10 flex h-10 w-10 items-center justify-center rounded-full",
                  "bg-black/5 text-foreground transition-colors hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                aria-label="Закрыть"
              >
                <X className="h-5 w-5" />
              </DialogClose>
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col"
              >
                <div className="flex max-h-[85vh] items-center justify-center p-4 pt-14">
                  <Image
                    src={lightboxHref}
                    alt={lightboxTitle}
                    width={1200}
                    height={900}
                    className="max-h-[80vh] max-w-full object-contain"
                  />
                </div>
                <p className="border-t border-border/60 bg-background/80 px-4 py-3 text-center text-sm text-muted-foreground backdrop-blur-sm">
                  {lightboxTitle}
                </p>
              </motion.div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
