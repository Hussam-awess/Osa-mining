"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRevealInView, fadeUp, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import { X, Expand } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    image: "/images/mining-site-1.jpg",
    title: "Chunya Gold Extraction Site",
    description:
      "Our flagship operation in the heart of Chunya, producing high-grade gold ore through advanced open-pit mining techniques.",
    category: "Gold Mining",
  },
  {
    image: "/images/mining-site-2.jpg",
    title: "Mineral Processing Facility",
    description:
      "State-of-the-art processing plant equipped with modern crushing, grinding, and refining technology.",
    category: "Processing",
  },
  {
    image: "/images/mining-site-3.jpg",
    title: "Geological Survey Operations",
    description:
      "Comprehensive geological exploration across Mbeya region, identifying new mineral deposits with precision mapping.",
    category: "Exploration",
  },
  {
    image: "/images/mining-site-4.jpg",
    title: "Community & Safety Program",
    description:
      "Our dedicated workforce trained to the highest international safety standards with ongoing community engagement.",
    category: "Safety",
  },
];

export function ProjectsSection() {
  const { ref, isInView } = useRevealInView();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="projects" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Our Projects"
          title="Operations & Mining Sites"
          description="Explore our active mining operations and processing facilities across the Chunya region."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-6 sm:grid-cols-2"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              variants={fadeUp}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={() => setSelectedImage(idx)}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/30 to-transparent transition-opacity duration-300" />

              {/* Expand icon */}
              <motion.div
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <Expand className="h-5 w-5" />
              </motion.div>

              {/* Category badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                  {project.category}
                </span>
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6">
                <motion.h3
                  className="mb-2 text-xl font-bold text-foreground"
                >
                  {project.title}
                </motion.h3>
                <p className="text-sm leading-relaxed text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100">
                  {project.description}
                </p>
              </div>

              {/* Bottom gradient line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-primary via-gold-light to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-deep/95 p-4 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-card/50 text-foreground backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-h-[90vh] max-w-4xl w-full flex-col overflow-y-auto rounded-2xl bg-card"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ minHeight: 200 }}>
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={projects[selectedImage].image}
                    alt={projects[selectedImage].title}
                    fill
                    className="rounded-t-2xl object-cover"
                  />
                </div>
              </div>
              <div className="flex shrink-0 flex-col gap-3 p-6 lg:p-8">
                <span className="inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {projects[selectedImage].category}
                </span>
                <h3 className="text-xl font-bold text-foreground lg:text-2xl">
                  {projects[selectedImage].title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground lg:text-base">
                  {projects[selectedImage].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
