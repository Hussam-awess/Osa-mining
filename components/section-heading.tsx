"use client";

import { motion } from "framer-motion";
import { useRevealInView, fadeUp } from "@/hooks/use-animations";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const { ref, isInView } = useRevealInView();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {/* Label */}
      <motion.div variants={fadeUp} className="mb-4 inline-flex items-center gap-3">
        <motion.div
          className="h-px w-8 bg-primary"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ originX: 0 }}
        />
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {label}
        </span>
        <motion.div
          className="h-px w-8 bg-primary"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ originX: 1 }}
        />
      </motion.div>

      {/* Title */}
      <motion.h2
        variants={fadeUp}
        className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {/* Animated underline */}
      <motion.div
        className={`mt-4 h-1 w-20 rounded-full bg-primary ${
          align === "center" ? "mx-auto" : ""
        }`}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: align === "center" ? 0.5 : 0 }}
      />

      {/* Description */}
      {description && (
        <motion.p
          variants={fadeUp}
          className={`mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
