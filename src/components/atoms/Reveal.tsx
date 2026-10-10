"use client";

import { ElementType, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  /** Stagger delay in milliseconds */
  delay?: number;
  className?: string;
};

/**
 * Fades + slides content up the first time it scrolls into view.
 * Content that is already on screen at load stays visible (no flash),
 * and visitors who prefer reduced motion get no animation.
 */
export default function Reveal({ children, as: Tag = "div", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={clsx(
        state !== "idle" && "transition duration-700 ease-out",
        state === "hidden" && "translate-y-6 opacity-0",
        className
      )}
      style={{ transitionDelay: state === "shown" ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}