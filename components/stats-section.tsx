"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function AnimatedCounter({ value, suffix, label, delay }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px -80px 0px" as string });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 2.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, delay, count]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col items-center gap-3 px-8 py-10"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay + 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background circle */}
      <motion.div
        className="absolute inset-0 m-auto h-28 w-28 rounded-full bg-primary/[0.04]"
        animate={isInView ? { scale: [0, 1.2, 1] } : {}}
        transition={{ delay: delay + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative">
        <span className="font-serif text-5xl font-bold text-primary lg:text-6xl">
          {displayValue}
          {suffix}
        </span>
      </div>

      <motion.div
        className="h-px w-12 bg-primary/30"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: delay + 0.6, duration: 0.5 }}
      />

      <span className="relative text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </motion.div>
  );
}

const stats = [
  { value: 12, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 200, suffix: "+", label: "Trusted Clients" },
  { value: 99, suffix: "%", label: "Safety Record" },
];

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px -100px 0px" as string });

  return (
    <section className="relative overflow-hidden py-20" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      {/* Animated border lines */}
      <motion.div
        className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-primary/10">
          {stats.map((stat, idx) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              delay={idx * 0.15}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
