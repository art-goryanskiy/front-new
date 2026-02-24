"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAuthUser } from "@/shared/store/auth-store";
import { useMyChat } from "@/entities/chat/api/use-my-chat";
import { useChatSocket } from "@/entities/chat/api/use-chat-socket";
import type { ChatSocketNewMessagePayload } from "@/entities/chat/api/use-chat-socket";
import { ChatPopoverContent } from "./chat-popover-content";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { metrikaGoals } from "@/shared/lib/analytics/metrika-goals";

const DEFAULT_BOTTOM = 24;
const DEFAULT_RIGHT = 24;
const ICON_SIZE = 56;
const DRAG_THRESHOLD_PX = 6;

export function PublicChatWidget() {
  const user = useAuthUser();
  const { chat, refetch: refetchChat } = useMyChat({ skip: !user });
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const dragStart = useRef<{
    x: number;
    y: number;
    startLeft: number;
    startTop: number;
  } | null>(null);
  const isDrag = useRef(false);
  const ignoreNextClick = useRef(false);
  const refetchMessagesRef = useRef<(() => void) | null>(null);

  const unreadCount = (chat?.unreadCount ?? 0) || 0;
  const showBadge = !open && unreadCount > 0;

  const handleNewMessage = useCallback(
    (payload: ChatSocketNewMessagePayload) => {
      if (payload.message.isFromAdmin) {
        refetchChat();
      }
      refetchMessagesRef.current?.();
    },
    [refetchChat]
  );

  useChatSocket(chat?.id ?? null, handleNewMessage);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === "undefined") return;
    const right = DEFAULT_RIGHT;
    const bottom = DEFAULT_BOTTOM;
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
      (e.currentTarget as HTMLElement).setPointerCapture?.(
        e.pointerId
      );
    },
    [position]
  );

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (
      !isDrag.current &&
      (Math.abs(dx) > DRAG_THRESHOLD_PX ||
        Math.abs(dy) > DRAG_THRESHOLD_PX)
    ) {
      isDrag.current = true;
    }
    if (isDrag.current) {
      const w = typeof window !== "undefined" ? window.innerWidth : 0;
      const h =
        typeof window !== "undefined" ? window.innerHeight : 0;
      const nextX = Math.max(
        0,
        Math.min(w - ICON_SIZE, dragStart.current.startLeft + dx)
      );
      const nextY = Math.max(
        0,
        Math.min(h - ICON_SIZE, dragStart.current.startTop + dy)
      );
      setPosition({ x: nextX, y: nextY });
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (dragStart.current) {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
      if (isDrag.current) {
        ignoreNextClick.current = true;
      }
      dragStart.current = null;
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (ignoreNextClick.current) {
      e.preventDefault();
      e.stopPropagation();
      ignoreNextClick.current = false;
    }
  }, []);

  if (!mounted) return null;

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (next && !open) {
        metrikaGoals.chatOpened();
      }
      setOpen(next);
    },
    [open]
  );

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
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
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={
              open
                ? "Закрыть чат"
                : showBadge
                  ? `Открыть чат (${unreadCount} новых)`
                  : "Открыть чат"
            }
            onClick={handleClick}
            className={cn(
              "relative flex h-full w-full items-center justify-center rounded-full shadow-lg transition-shadow",
              "bg-primary text-primary-foreground",
              "hover:shadow-xl focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background focus:outline-none",
              "cursor-grab active:cursor-grabbing",
              "border border-primary/20"
            )}
            style={{
              boxShadow:
                "0 4px 20px rgba(var(--primary-rgb, 59 130 246) / 0.4)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={(e) => {
              if (dragStart.current) {
                (
                  e.currentTarget as HTMLElement
                ).releasePointerCapture?.(e.pointerId);
                dragStart.current = null;
              }
            }}
          >
            <MessageCircle className="h-7 w-7" strokeWidth={2} />
            {showBadge && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground shadow-sm">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        </PopoverTrigger>
      </motion.div>

      <PopoverContent
        side="top"
        align="end"
        sideOffset={12}
        alignOffset={0}
        avoidCollisions={true}
        className={cn(
          "max-h-[85vh] w-full max-w-md overflow-hidden rounded-2xl p-0",
          "border border-border/50 bg-background shadow-md",
          "shadow-black/5 dark:shadow-black/15"
        )}
        aria-describedby={undefined}
      >
        <div className="relative pt-1 pr-12">
          <PopoverClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              aria-label="Закрыть чат"
            >
              <X className="h-4 w-4" />
            </Button>
          </PopoverClose>
          <div id="chat-description" className="sr-only">
            Окно чата с поддержкой. Напишите сообщение или прочитайте
            переписку.
          </div>
          <ChatPopoverContent
            refetchMessagesRef={refetchMessagesRef}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
