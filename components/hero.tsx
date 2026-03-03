"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowDown, MessageCircle } from "lucide-react";
import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/255692811131?text=Hello%20Osa%20Mining,%20I%20would%20like%20to%20inquire%20about%20your%20services.";

function FloatingParticle({ delay, x, size, duration }: { delay: number; x: string; size: number; duration: number }) {
  return (
    <motion.div
      className="absolute rounded-full bg-primary/30"
      style={{ left: x, width: size, height: size }}
      initial={{ y: "100vh", opacity: 0 }}
      animate={{
        y: "-10vh",
        opacity: [0, 0.6, 0.8, 0.6, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

// Deterministic pseudo-random number generator to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const letterVariants = {
  hidden: { opacity: 0, y: 80, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: 0.8 + i * 0.04,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(titleRef, { once: true });

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = mounted
    ? Array.from({ length: 20 }).map((_, i) => ({
        x: `${Math.round(seededRandom(i * 3 + 1) * 100)}%`,
        size: Math.round(2 + seededRandom(i * 3 + 2) * 4),
        duration: Math.round(12 + seededRandom(i * 3 + 3) * 8),
      }))
    : [];

  const { scrollY } = useScroll();

  // Hero section height for parallax math
  const [sectionHeight, setSectionHeight] = useState(1);
  useEffect(() => {
    const el = sectionRef.current;
    if (el) setSectionHeight(el.offsetHeight || 1);
    const handleResize = () => {
      if (el) setSectionHeight(el.offsetHeight || 1);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollYProgress = useTransform(scrollY, [0, sectionHeight], [0, 1]);

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const titleText = "Leading the Future of Mining in Tanzania";
  const words = titleText.split(" ");

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen min-h-[700px] overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
        <Image
          src="/chunya gold extraction site.png"
          alt="Mining operation in Chunya, Tanzania"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Dark Overlay */}
      <motion.div
        className="absolute inset-0 bg-charcoal-deep"
        style={{ opacity: overlayOpacity }}
      />

      {/* Gold Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.8}
            x={p.x}
            size={p.size}
            duration={p.duration}
          />
        ))}
      </div>

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(oklch(0.78 0.15 75) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.78 0.15 75) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* Scanning Line Effect */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent pointer-events-none"
        animate={{ top: ["-10%", "110%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8"
        >
          <div className="relative inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-md">
            <motion.div
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-primary">
              Established 2013 - Chunya, Tanzania
            </span>
          </div>
        </motion.div>

        {/* Title with 3D letter-by-letter reveal */}
        <h1
          ref={titleRef}
          className="mx-auto max-w-5xl font-serif text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ perspective: "1000px" }}
        >
          {words.map((word, wordIdx) => (
            <span key={wordIdx} className="inline-block mr-[0.3em]">
              {word.split("").map((char, charIdx) => {
                const globalIdx = words
                  .slice(0, wordIdx)
                  .reduce((acc, w) => acc + w.length, 0) + charIdx;
                const isGold = word === "Future" || word === "Mining" || word === "Tanzania";
                return (
                  <motion.span
                    key={`${wordIdx}-${charIdx}`}
                    custom={globalIdx}
                    variants={letterVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className={`inline-block ${isGold ? "text-primary" : "text-foreground"}`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl"
        >
          Pioneering gold mining and mineral exploration with integrity,
          innovation, and sustainable practices across Tanzania.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px oklch(0.78 0.15 75 / 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gold-light/20"
              initial={{ x: "-100%", skewX: -20 }}
              whileHover={{ x: "150%" }}
              transition={{ duration: 0.7 }}
            />
            <span className="relative flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Get a Free Consultation
            </span>
          </motion.a>

          <motion.a
            href="#services"
            className="group relative overflow-hidden rounded-lg border border-primary/30 bg-primary/5 px-8 py-4 text-base font-semibold text-primary backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: "oklch(0.78 0.15 75 / 0.6)" }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative">Explore Services</span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
            <ArrowDown className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
