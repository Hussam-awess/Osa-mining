"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRevealInView, fadeUp, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Gallery images from public folder
const galleryImages = [
  { 
    id: 1, 
    title: "Our Founder", 
    category: "team", 
    src: "/Founder.jpeg",
    description: "The visionary leader behind Osa Mining's success in Tanzania's mining industry"
  },
  { 
    id: 2, 
    title: "Team at Work", 
    category: "team", 
    src: "/Team at work.jpeg",
    description: "Our dedicated team working together to achieve mining excellence"
  },
  { 
    id: 3, 
    title: "Gold Extraction Process", 
    category: "mining", 
    src: "/Gold Extraction Process.jpeg",
    description: "Advanced gold extraction techniques ensuring maximum yield and quality"
  },
  { 
    id: 4, 
    title: "Mining Equipment", 
    category: "equipment", 
    src: "/mining-equipments.mp4",
    description: "State-of-the-art mining equipment for efficient and safe operations"
  },
  { 
    id: 5, 
    title: "Gold Extraction", 
    category: "processing", 
    src: "/extraction-of-gold.mp4",
    description: "Live demonstration of our gold extraction and purification process"
  },
  { 
    id: 6, 
    title: "Processing Facility", 
    category: "processing", 
    src: "/processing-facility.mp4",
    description: "Modern processing facility equipped with latest technology"
  },
  { 
    id: 7, 
    title: "Underground Mining", 
    category: "mining", 
    src: "/underground-mining.mp4",
    description: "Underground mining operations with safety as our top priority"
  },
  { 
    id: 8, 
    title: "Team Operations", 
    category: "team", 
    src: "/team-at-work.mp4",
    description: "Our skilled team in action during daily mining operations"
  },
];

const IMAGES_PER_PAGE = 6;

export function GalleryPage() {
  const { ref, isInView } = useRevealInView();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE);
  const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = galleryImages.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[120px]" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our mining operations, facilities, and team in action through our comprehensive photo gallery.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {currentImages.map((image, idx) => (
              <motion.div
                key={image.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image or Video */}
                <div className="relative aspect-square overflow-hidden">
                  {image.src.endsWith('.mp4') ? (
                    <div className="relative h-full w-full">
                      <video 
                        src={image.src} 
                        className="h-full w-full object-cover"
                        controls
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : (
                    <img
                      src={image.src}
                      alt={image.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                </div>
                
                {/* Description below image */}
                <div className="p-4">
                  <h3 className="mb-1 text-lg font-semibold text-foreground">{image.title}</h3>
                  <p className="mb-2 text-sm text-muted-foreground capitalize">{image.category}</p>
                  <p className="text-xs leading-relaxed text-muted-foreground">{image.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-12 flex items-center justify-center gap-4"
            >
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`h-10 w-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {page}
                  </motion.button>
                ))}
              </div>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
                whileTap={{ scale: currentPage === totalPages ? 1 : 0.95 }}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
