"use client";

import { motion } from "framer-motion";
import { useRevealInView, fadeUp, slideInLeft, slideInRight, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import { Shield, Lightbulb, Leaf, Award } from "lucide-react";
import Image from "next/image";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity",
    description: "Transparent and ethical practices across every level of our operations.",
  },
  {
    icon: Award,
    title: "Safety",
    description: "Zero-compromise approach to the safety of our workforce and communities.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Responsible mining with a commitment to environmental stewardship.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Leveraging modern technology to maximize efficiency and minimize impact.",
  },
];

export function AboutSection() {
  const { ref: contentRef, isInView: contentInView } = useRevealInView();
  const { ref: valuesRef, isInView: valuesInView } = useRevealInView();

  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decorations */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/[0.02] blur-[100px]" />
      <div className="absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-primary/[0.03] blur-[80px]" />

      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          label="About Us"
          title="A Legacy of Excellence in Mining"
          description="Founded in 2013 by Asadin, Osa Mining has grown into one of Tanzania's most respected mining enterprises, delivering world-class extraction and exploration services."
        />

        {/* Content Grid */}
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16 items-center"
        >
          {/* Image side */}
          <motion.div variants={slideInLeft} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/Our story.jpeg"
                alt="Osa Mining operations and company story in Chunya, Tanzania"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>

            {/* Floating stat card */}
            <motion.div
              className="absolute -bottom-6 -right-4 rounded-xl border border-primary/20 bg-card/90 p-5 shadow-2xl backdrop-blur-md sm:-right-8"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={contentInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-3xl font-bold text-primary font-serif">12+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </motion.div>

            {/* Corner accent */}
            <motion.div
              className="absolute -left-3 -top-3 h-16 w-16 rounded-tl-2xl border-l-2 border-t-2 border-primary/40"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={contentInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>

          {/* Text side */}
          <motion.div variants={slideInRight} className="flex flex-col gap-6">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Our Story
              </h3>
              <p className="leading-relaxed text-muted-foreground">
                From our humble beginnings in Chunya, Mbeya City, Osa Mining has
                evolved into a powerhouse of mineral exploration and gold
                extraction. Our founder, Asadin, envisioned a company that could
                harness Tanzania{"'"}s rich mineral wealth while upholding the
                highest standards of safety and environmental responsibility.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                Today, we operate across multiple sites in the Chunya region,
                employing cutting-edge technology and a dedicated workforce
                committed to excellence. Our operations span the full mining
                lifecycle, from exploration and surveying to extraction,
                processing, and logistics.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid gap-4 sm:grid-cols-2">
              <motion.div
                className="rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
                whileHover={{ y: -4, borderColor: "oklch(0.78 0.15 75 / 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="mb-2 font-semibold text-primary">Mission</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To deliver sustainable and responsible mining solutions that
                  generate value for communities and stakeholders alike.
                </p>
              </motion.div>
              <motion.div
                className="rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm"
                whileHover={{ y: -4, borderColor: "oklch(0.78 0.15 75 / 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="mb-2 font-semibold text-primary">Vision</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  To be East Africa{"'"}s most trusted and innovative mining
                  enterprise, setting the benchmark for excellence.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Core Values */}
        <motion.div
          ref={valuesRef}
          initial="hidden"
          animate={valuesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {coreValues.map((value, idx) => (
            <motion.div
              key={value.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 bg-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              {/* Number watermark */}
              <span className="absolute -right-2 -top-4 font-serif text-7xl font-bold text-primary/[0.05]">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="relative">
                <motion.div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="h-6 w-6" />
                </motion.div>
                <h4 className="mb-2 font-semibold text-foreground">{value.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
