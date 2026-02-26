"use client";

import { motion } from "framer-motion";
import { useRevealInView, fadeUp, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import { TreePine, HeartHandshake, HardHat, Recycle } from "lucide-react";

const pillars = [
  {
    icon: TreePine,
    title: "Environmental Responsibility",
    points: [
      "Comprehensive land reclamation after mining operations",
      "Minimized carbon footprint through efficient machinery",
      "Water management and recycling programs",
      "Regular environmental impact assessments",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Community Support",
    points: [
      "Local employment and skills development programs",
      "Education sponsorships for community youth",
      "Infrastructure development in mining regions",
      "Community health and welfare initiatives",
    ],
  },
  {
    icon: HardHat,
    title: "Worker Safety Standards",
    points: [
      "International safety protocols and certifications",
      "Regular safety drills and training programs",
      "Modern PPE and monitoring equipment",
      "24/7 on-site medical facilities",
    ],
  },
  {
    icon: Recycle,
    title: "Sustainable Practices",
    points: [
      "Responsible waste disposal and recycling",
      "Energy-efficient processing technologies",
      "Biodiversity preservation programs",
      "Compliance with Tanzania mining regulations",
    ],
  },
];

export function SustainabilitySection() {
  const { ref, isInView } = useRevealInView();

  return (
    <section id="sustainability" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <motion.div
          className="absolute left-0 top-1/4 h-[400px] w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
        <motion.div
          className="absolute right-0 top-1/3 h-[300px] w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Sustainability & Safety"
          title="Mining with Purpose"
          description="We believe that responsible mining and community wellbeing go hand in hand. Our commitment to sustainability shapes every decision we make."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2"
        >
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {/* Corner accent */}
              <motion.div
                className="absolute right-0 top-0 h-20 w-20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-bl from-primary/10 to-transparent" />
              </motion.div>

              {/* Number */}
              <span className="absolute right-6 top-6 font-serif text-6xl font-bold text-primary/[0.05]">
                {String(idx + 1).padStart(2, "0")}
              </span>

              {/* Header */}
              <div className="mb-6 flex items-center gap-4">
                <motion.div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <pillar.icon className="h-7 w-7" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">{pillar.title}</h3>
              </div>

              {/* Points */}
              <ul className="space-y-3">
                {pillar.points.map((point, pointIdx) => (
                  <motion.li
                    key={pointIdx}
                    className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + idx * 0.1 + pointIdx * 0.08, duration: 0.5 }}
                  >
                    <motion.div
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ delay: 1 + pointIdx * 0.2, duration: 1, repeat: Infinity, repeatDelay: 4 }}
                    />
                    {point}
                  </motion.li>
                ))}
              </ul>

              {/* Hover glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/20 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
