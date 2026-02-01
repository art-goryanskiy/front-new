"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { FormErrorSummary } from "@/shared/ui/form-error-summary/form-error-summary";
import { Surface } from "@/shared/ui/surface/surface";
import { Eye, EyeOff, Mail } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Controller,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form";
import {
  EMAIL_REGEX,
  LOGIN_FORM_TEXTS,
} from "../../features/auth/ui/constants/login-form-constants";
import { REGISTER_FORM_TEXTS } from "../../features/auth/ui/constants/register-form-constants";
import { useLoginForm } from "../../features/auth/ui/hooks/use-login-form";
import { useRegisterForm } from "../../features/auth/ui/hooks/use-register-form";
import { HandWrittenTitle } from "./hand-writing-text";

type AuthFormDataCommon = {
  email: string;
  password: string;
  confirmPassword?: string;
};

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY,
}: PupilProps) => {
  const pupilRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If forced look direction is provided, use that instead of mouse tracking
      if (forceLookX !== undefined && forceLookY !== undefined) {
        setPupilPosition({ x: forceLookX, y: forceLookY });
        return;
      }

      const el = pupilRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.min(
        Math.sqrt(deltaX ** 2 + deltaY ** 2),
        maxDistance
      );

      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPupilPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [forceLookX, forceLookY, maxDistance]);

  const effectivePupilPosition =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : pupilPosition;

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${effectivePupilPosition.x}px, ${effectivePupilPosition.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY,
}: EyeBallProps) => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // If forced look direction is provided, use that instead of mouse tracking
      if (forceLookX !== undefined && forceLookY !== undefined) {
        setPupilPosition({ x: forceLookX, y: forceLookY });
        return;
      }

      const el = eyeRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.min(
        Math.sqrt(deltaX ** 2 + deltaY ** 2),
        maxDistance
      );

      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPupilPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [forceLookX, forceLookY, maxDistance]);

  const effectivePupilPosition =
    forceLookX !== undefined && forceLookY !== undefined
      ? { x: forceLookX, y: forceLookY }
      : pupilPosition;

  return (
    <div
      ref={eyeRef}
      className="flex items-center justify-center rounded-full transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${effectivePupilPosition.x}px, ${effectivePupilPosition.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

export function LoginFormPage() {
  const pathname = usePathname();
  const router = useRouter();
  const isRegister = pathname === "/register";

  const loginForm = useLoginForm();
  const registerForm = useRegisterForm();

  const form = isRegister ? registerForm.form : loginForm.form;
  const onSubmit = isRegister
    ? registerForm.onSubmit
    : loginForm.onSubmit;
  const isLoading = isRegister
    ? registerForm.loading
    : loginForm.loading;
  const error = isRegister ? registerForm.error : loginForm.error;

  // We render login/register in one component, so we use a shared
  // form shape (email/password + optional confirmPassword) to avoid
  // union-type issues from react-hook-form generics.
  const commonForm =
    form as unknown as UseFormReturn<AuthFormDataCommon>;
  const commonOnSubmit =
    onSubmit as unknown as SubmitHandler<AuthFormDataCommon>;

  const handleInvalid = useCallback(() => {
    const el = document.getElementById("auth-form-error-summary");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = commonForm.handleSubmit(
    commonOnSubmit,
    handleInvalid
  );

  const texts = isRegister ? REGISTER_FORM_TEXTS : LOGIN_FORM_TEXTS;

  const emailRules = {
    required: texts.email.required,
    pattern: {
      value: EMAIL_REGEX,
      message: texts.email.invalidFormat,
    },
  };

  const passwordRules = isRegister
    ? {
        required: texts.password.required,
        minLength: {
          value: 6,
          message: REGISTER_FORM_TEXTS.password.minLength,
        },
      }
    : { required: texts.password.required };

  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [activePasswordField, setActivePasswordField] = useState<
    "password" | "confirmPassword" | null
  >(null);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] =
    useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);
  const [characterRects, setCharacterRects] = useState<{
    purple: DOMRect | null;
    black: DOMRect | null;
    yellow: DOMRect | null;
    orange: DOMRect | null;
  }>({
    purple: null,
    black: null,
    yellow: null,
    orange: null,
  });

  const handlePasswordKey = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      setCapsLockOn(e.getModifierState("CapsLock"));
    },
    []
  );

  const password = commonForm.watch("password") || "";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effect for purple character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Blinking effect for black character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other animation when typing starts
  useEffect(() => {
    if (isTyping) {
      const start = setTimeout(() => {
        setIsLookingAtEachOther(true);
      }, 0);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800); // Look at each other for 1.5 seconds, then back to tracking mouse
      return () => {
        clearTimeout(start);
        clearTimeout(timer);
      };
    } else {
      const stop = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 0);
      return () => clearTimeout(stop);
    }
  }, [isTyping]);

  // Purple sneaky peeking animation when typing password and it's visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(
          () => {
            setIsPurplePeeking(true);
            setTimeout(() => {
              setIsPurplePeeking(false);
            }, 800); // Peek for 800ms
          },
          Math.random() * 3000 + 2000
        ); // Random peek every 2-5 seconds
        return peekInterval;
      };

      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      const stop = setTimeout(() => {
        setIsPurplePeeking(false);
      }, 0);
      return () => clearTimeout(stop);
    }
  }, [password, showPassword, isPurplePeeking]);

  useEffect(() => {
    const measure = () => {
      setCharacterRects({
        purple: purpleRef.current?.getBoundingClientRect() ?? null,
        black: blackRef.current?.getBoundingClientRect() ?? null,
        yellow: yellowRef.current?.getBoundingClientRect() ?? null,
        orange: orangeRef.current?.getBoundingClientRect() ?? null,
      });
    };

    measure();

    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isTyping, showPassword, password.length]);

  const calculatePosition = (rect: DOMRect | null) => {
    if (!rect) return { faceX: 0, faceY: 0, bodyRotation: 0 };

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3; // Focus on head area

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Face movement (limited range)
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));

    // Body lean (skew for lean while keeping bottom straight) - negative to lean towards mouse
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(characterRects.purple);
  const blackPos = calculatePosition(characterRects.black);
  const yellowPos = calculatePosition(characterRects.yellow);
  const orangePos = calculatePosition(characterRects.orange);

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Content Section */}
      <div className="relative hidden flex-col justify-between bg-linear-to-br from-primary/90 via-primary to-primary/80 p-12 text-primary-foreground lg:flex">
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <HandWrittenTitle
              title="Стандарт +"
              subtitle="учебный центр"
            />
          </div>
        </div>

        <div className="relative z-20 flex h-[500px] items-end justify-center">
          {/* Cartoon Characters */}
          <div
            className="relative"
            style={{ width: "550px", height: "400px" }}
          >
            {/* Purple tall rectangle character - Back layer */}
            <div
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "70px",
                width: "180px",
                height:
                  isTyping || (password.length > 0 && !showPassword)
                    ? "440px"
                    : "400px",
                /* Тёплый крем — комплиментарен оранжевому и жёлтому, виден на красном фоне в любой теме */
                backgroundColor: "#fffbeb",
                borderRadius: "10px 10px 0 0",
                zIndex: 1,
                transform:
                  password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : isTyping ||
                        (password.length > 0 && !showPassword)
                      ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(40px)`
                      : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Eyes */}
              <div
                className="absolute flex gap-8 transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${20}px`
                      : isLookingAtEachOther
                        ? `${55}px`
                        : `${45 + purplePos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${35}px`
                      : isLookingAtEachOther
                        ? `${65}px`
                        : `${40 + purplePos.faceY}px`,
                }}
              >
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="var(--foreground)"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
                <EyeBall
                  size={18}
                  pupilSize={7}
                  maxDistance={5}
                  eyeColor="white"
                  pupilColor="var(--foreground)"
                  isBlinking={isPurpleBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 4
                        : -4
                      : isLookingAtEachOther
                        ? 3
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? isPurplePeeking
                        ? 5
                        : -4
                      : isLookingAtEachOther
                        ? 4
                        : undefined
                  }
                />
              </div>
            </div>

            {/* Black tall rectangle character - Middle layer */}
            <div
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "240px",
                width: "120px",
                height: "310px",
                backgroundColor: "var(--foreground)",
                borderRadius: "8px 8px 0 0",
                zIndex: 2,
                transform:
                  password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : isLookingAtEachOther
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(20px)`
                      : isTyping ||
                          (password.length > 0 && !showPassword)
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)`
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Eyes */}
              <div
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${10}px`
                      : isLookingAtEachOther
                        ? `${32}px`
                        : `${26 + blackPos.faceX}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${28}px`
                      : isLookingAtEachOther
                        ? `${12}px`
                        : `${32 + blackPos.faceY}px`,
                }}
              >
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="var(--foreground)"
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
                <EyeBall
                  size={16}
                  pupilSize={6}
                  maxDistance={4}
                  eyeColor="white"
                  pupilColor="var(--foreground)"
                  isBlinking={isBlackBlinking}
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? 0
                        : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : isLookingAtEachOther
                        ? -4
                        : undefined
                  }
                />
              </div>
            </div>

            {/* Orange semi-circle character - Front left */}
            <div
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "0px",
                width: "240px",
                height: "200px",
                zIndex: 3,
                backgroundColor: "#FF9B6B",
                borderRadius: "120px 120px 0 0",
                transform:
                  password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Eyes - just pupils, no white */}
              <div
                className="absolute flex gap-8 transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${50}px`
                      : `${82 + (orangePos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${85}px`
                      : `${90 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="var(--foreground)"
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -5
                      : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : undefined
                  }
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="var(--foreground)"
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -5
                      : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : undefined
                  }
                />
              </div>
            </div>

            {/* Yellow tall rectangle character - Front right */}
            <div
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: "310px",
                width: "140px",
                height: "230px",
                backgroundColor: "#E8D754",
                borderRadius: "70px 70px 0 0",
                zIndex: 4,
                transform:
                  password.length > 0 && showPassword
                    ? `skewX(0deg)`
                    : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: "bottom center",
              }}
            >
              {/* Eyes - just pupils, no white */}
              <div
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${20}px`
                      : `${52 + (yellowPos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${35}px`
                      : `${40 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="var(--foreground)"
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -5
                      : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : undefined
                  }
                />
                <Pupil
                  size={12}
                  maxDistance={5}
                  pupilColor="var(--foreground)"
                  forceLookX={
                    password.length > 0 && showPassword
                      ? -5
                      : undefined
                  }
                  forceLookY={
                    password.length > 0 && showPassword
                      ? -4
                      : undefined
                  }
                />
              </div>
              {/* Horizontal line for mouth */}
              <div
                className="absolute h-[4px] w-20 rounded-full bg-foreground transition-all duration-200 ease-out"
                style={{
                  left:
                    password.length > 0 && showPassword
                      ? `${10}px`
                      : `${40 + (yellowPos.faceX || 0)}px`,
                  top:
                    password.length > 0 && showPassword
                      ? `${88}px`
                      : `${88 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-8 text-sm text-primary-foreground/60">
          <a
            href="#"
            className="transition-colors hover:text-primary-foreground"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="transition-colors hover:text-primary-foreground"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="transition-colors hover:text-primary-foreground"
          >
            Contact
          </a>
        </div>

        {/* Decorative elements */}
        <div className="bg-grid-white/[0.05] absolute inset-0 bg-size-[20px_20px]" />
        <div className="absolute top-1/4 right-1/4 size-64 rounded-full bg-primary-foreground/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 size-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>

      {/* Right Form Section */}
      <div className="flex items-center justify-center bg-background p-8">
        <div className="w-full max-w-[420px]">
          {/* Mobile Logo */}
          <div className="mb-12 flex items-center justify-center gap-2 text-lg font-semibold lg:hidden">
            <HandWrittenTitle
              title="Стандарт +"
              subtitle="учебный центр"
            />
          </div>

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              {texts.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isRegister ? "Создайте аккаунт" : "Войдите в аккаунт"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div id="auth-form-error-summary">
              <FormErrorSummary<AuthFormDataCommon>
                errors={commonForm.formState.errors}
                labels={{
                  email: texts.email.label,
                  password: texts.password.label,
                  confirmPassword: isRegister
                    ? REGISTER_FORM_TEXTS.confirmPassword.label
                    : undefined,
                }}
              />
            </div>

            {error && (
              <Surface
                variant="default"
                className="w-full border-destructive/30 bg-destructive/10 p-4"
                role="alert"
              >
                <p className="text-sm font-medium text-destructive">
                  {error?.message || texts.error.default}
                </p>
              </Surface>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Controller
                name="email"
                control={commonForm.control}
                rules={emailRules}
                render={({ field, fieldState }) => (
                  <>
                    <div className="group relative pt-2">
                      <Label
                        htmlFor="email"
                        className={cn(
                          "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                          fieldState.invalid
                            ? "text-destructive"
                            : "text-muted-foreground group-focus-within:text-foreground"
                        )}
                      >
                        {texts.email.label}
                      </Label>

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        inputMode="email"
                        placeholder={texts.email.placeholder}
                        autoComplete="email"
                        disabled={isLoading}
                        onFocus={() => setIsTyping(true)}
                        onBlur={() => setIsTyping(false)}
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          "peer h-12 border-border/60 bg-background/60 pr-10",
                          "focus:border-primary"
                        )}
                      />
                    </div>

                    {fieldState.error?.message && (
                      <p className="text-xs font-medium text-destructive">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Controller
                name="password"
                control={commonForm.control}
                rules={passwordRules}
                render={({ field, fieldState }) => (
                  <>
                    <div className="group relative pt-2">
                      <Label
                        htmlFor="password"
                        className={cn(
                          "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                          fieldState.invalid
                            ? "text-destructive"
                            : "text-muted-foreground group-focus-within:text-foreground"
                        )}
                      >
                        {texts.password.label}
                      </Label>

                      <div className="relative">
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder={texts.password.placeholder}
                          autoComplete={
                            isRegister
                              ? "new-password"
                              : "current-password"
                          }
                          disabled={isLoading}
                          onKeyDown={handlePasswordKey}
                          onKeyUp={handlePasswordKey}
                          onFocus={() => {
                            setIsTyping(true);
                            setActivePasswordField("password");
                          }}
                          onBlur={() => {
                            setIsTyping(false);
                            setActivePasswordField((v) =>
                              v === "password" ? null : v
                            );
                          }}
                          aria-invalid={fieldState.invalid}
                          className={cn(
                            "peer h-12 border-border/60 bg-background/60 pr-11",
                            "focus:border-primary"
                          )}
                        />

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword((v) => !v)}
                          disabled={isLoading}
                          className="absolute top-1/2 right-2 h-9 w-9 -translate-y-1/2 rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted/20 hover:text-foreground"
                          aria-label={
                            showPassword
                              ? "Скрыть пароль"
                              : "Показать пароль"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {fieldState.error?.message && (
                      <p className="text-xs font-medium text-destructive">
                        {fieldState.error.message}
                      </p>
                    )}

                    {capsLockOn &&
                      !showPassword &&
                      activePasswordField === "password" && (
                        <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                          Caps Lock включён
                        </div>
                      )}
                  </>
                )}
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Controller
                  name="confirmPassword"
                  control={commonForm.control}
                  rules={{
                    required:
                      REGISTER_FORM_TEXTS.confirmPassword.required,
                    validate: (value) =>
                      value === commonForm.getValues("password") ||
                      REGISTER_FORM_TEXTS.confirmPassword.mismatch,
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <div className="group relative pt-2">
                        <Label
                          htmlFor="confirmPassword"
                          className={cn(
                            "absolute top-2 left-3 z-10 -translate-y-1/2 rounded-md bg-background/80 px-1 text-[11px] font-medium backdrop-blur-sm transition-colors",
                            fieldState.invalid
                              ? "text-destructive"
                              : "text-muted-foreground group-focus-within:text-foreground"
                          )}
                        >
                          {REGISTER_FORM_TEXTS.confirmPassword.label}
                        </Label>

                        <div className="relative">
                          <Input
                            {...field}
                            id="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            placeholder={
                              REGISTER_FORM_TEXTS.confirmPassword
                                .placeholder
                            }
                            autoComplete="new-password"
                            disabled={isLoading}
                            onKeyDown={handlePasswordKey}
                            onKeyUp={handlePasswordKey}
                            onFocus={() => {
                              setIsTyping(true);
                              setActivePasswordField(
                                "confirmPassword"
                              );
                            }}
                            onBlur={() => {
                              setIsTyping(false);
                              setActivePasswordField((v) =>
                                v === "confirmPassword" ? null : v
                              );
                            }}
                            aria-invalid={fieldState.invalid}
                            className={cn(
                              "peer h-12 border-border/60 bg-background/60 pr-11",
                              "focus:border-primary"
                            )}
                          />

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword((v) => !v)}
                            disabled={isLoading}
                            className="absolute top-1/2 right-2 h-9 w-9 -translate-y-1/2 rounded-xl border border-border/60 bg-background/60 text-muted-foreground shadow-sm backdrop-blur hover:bg-muted/20 hover:text-foreground"
                            aria-label={
                              showPassword
                                ? "Скрыть пароль"
                                : "Показать пароль"
                            }
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {fieldState.error?.message && (
                        <p className="text-xs font-medium text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}

                      {capsLockOn &&
                        !showPassword &&
                        activePasswordField === "confirmPassword" && (
                          <div className="inline-flex items-center rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                            Caps Lock включён
                          </div>
                        )}
                    </>
                  )}
                />
              </div>
            )}

            {!isRegister && (
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Забыли пароль?
                </button>
              </div>
            )}

            <Button
              type="submit"
              className="h-12 w-full text-base font-medium"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <Spinner size={18} className="h-[18px] w-[18px]" />
                  {isRegister
                    ? "Создание аккаунта…"
                    : "Вход в аккаунт…"}
                </span>
              ) : isRegister ? (
                "Создать аккаунт"
              ) : (
                "Войти"
              )}
            </Button>
          </form>

          {/* Social Login - only for login */}
          {!isRegister && (
            <div className="mt-6">
              <Button
                variant="outline"
                className="h-12 w-full border-border/60 bg-background hover:bg-accent"
                type="button"
                disabled
              >
                <Mail className="mr-2 size-5" />
                Войти через Google (скоро)
              </Button>
            </div>
          )}

          {/* Switch Link */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {isRegister ? (
              <>
                Уже есть аккаунт?{" "}
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/login");
                  }}
                  className="font-medium text-foreground hover:underline"
                >
                  Войти
                </a>
              </>
            ) : (
              <>
                Нет аккаунта?{" "}
                <a
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/register");
                  }}
                  className="font-medium text-foreground hover:underline"
                >
                  Зарегистрироваться
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
