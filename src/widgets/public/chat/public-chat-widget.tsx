"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChatPopoverContent } from "./chat-popover-content";
import { cn } from "@/lib/utils";

const DEFAULT_BOTTOM = 24;
const DEFAULT_RIGHT = 24;
const ICON_SIZE = 56;
const DRAG_THRESHOLD_PX = 6;

export function PublicChatWidget() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const dragStart = useRef<{ x: number; y: number; startLeft: number; startTop: number } | null>(null);
  const isDrag = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const right = DEFAULT_RIGHT;
    const bottom = DEFAULT_BOTTOM;
    setPosition({
      x: window.innerWidth - right - ICON_SIZE,
      y: window.innerHeight - bottom - ICON_SIZE,
    });
  }, [mounted]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        startLeft: position.x,
        startTop: position.y,
      };
      isDrag.current = false;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [position]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (!isDrag.current && (Math.abs(dx) > DRAG_THRESHOLD_PX || Math.abs(dy) > DRAG_THRESHOLD_PX)) {
        isDrag.current = true;
      }
      if (isDrag.current) {
        const w = typeof window !== "undefined" ? window.innerWidth : 0;
        const h = typeof window !== "undefined" ? window.innerHeight : 0;
        const nextX = Math.max(0, Math.min(w - ICON_SIZE, dragStart.current.startLeft + dx));
        const nextY = Math.max(0, Math.min(h - ICON_SIZE, dragStart.current.startTop + dy));
        setPosition({ x: nextX, y: nextY });
      }
    },
    []
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStart.current) {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
        if (!isDrag.current) {
          setOpen((prev) => !prev);
        }
        dragStart.current = null;
      }
    },
    []
  );

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed z-40"
        style={{
          left: position.x,
          top: position.y,
          width: ICON_SIZE,
          height: ICON_SIZE,
        }}
        initial={false}
      >
        <button
          type="button"
          aria-label={open ? "Закрыть чат" : "Открыть чат"}
          className={cn(
            "flex h-full w-full items-center justify-center rounded-full shadow-lg transition-shadow",
            "bg-primary text-primary-foreground",
            "hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
            "cursor-grab active:cursor-grabbing",
            "border border-primary/20"
          )}
          style={{
            boxShadow: "0 4px 20px rgba(var(--primary-rgb, 59 130 246) / 0.4)",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={(e) => {
            if (dragStart.current) {
              (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
              dragStart.current = null;
            }
          }}
        >
          <MessageCircle className="h-7 w-7" strokeWidth={2} />
        </button>
      </motion.div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="max-h-[90vh] w-full max-w-md overflow-hidden rounded-2xl border-border/60 p-0 shadow-2xl shadow-black/10 dark:shadow-black/30"
          showClose={true}
          overlayClassName="bg-black/50 backdrop-blur-sm"
        >
          <DialogTitle className="sr-only">Чат с поддержкой</DialogTitle>
          <ChatPopoverContent />
        </DialogContent>
      </Dialog>
    </>
  );
}
