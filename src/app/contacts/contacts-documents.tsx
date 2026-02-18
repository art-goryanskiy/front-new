"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileCheck, Expand } from "lucide-react";
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
 * Премиальный блок документов: BlurGlow, Surface, сетка карточек с превью и лайтбоксом.
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONTACT_DOCUMENTS.map((doc, index) => (
              <motion.div
                key={doc.href}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-24px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <button
                  type="button"
                  onClick={() => openLightbox(doc.href, doc.title)}
                  className={cn(
                    "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-card/60 text-left",
                    "shadow-md transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted/30">
                    <Image
                      src={doc.href}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"
                      aria-hidden
                    />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="line-clamp-2 text-sm font-medium text-white drop-shadow-md">
                        {doc.title}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm transition-colors group-hover:bg-primary">
                        <Expand className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </Surface>
      </section>

      <Dialog open={!!lightboxHref} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent
          showClose={true}
          className="max-w-5xl border-0 bg-transparent p-0 shadow-2xl"
          aria-describedby={undefined}
        >
          {lightboxHref && (
            <>
              <DialogTitle className="sr-only">{lightboxTitle}</DialogTitle>
              <div className="relative max-h-[85vh] w-full overflow-hidden rounded-xl bg-muted/20">
                <Image
                  src={lightboxHref}
                  alt={lightboxTitle}
                  width={1200}
                  height={900}
                  className="h-auto w-full object-contain"
                />
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {lightboxTitle}
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
