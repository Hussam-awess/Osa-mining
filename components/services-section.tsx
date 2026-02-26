"use client";

import { motion } from "framer-motion";
import { useRevealInView, fadeUp, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import {
  Gem,
  Search,
  Factory,
  Users,
  Truck,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_BASE =
  "https://wa.me/255692811131?text=Hello%20Osa%20Mining,%20I%20would%20like%20to%20inquire%20about%20";

const services = [
  {
    icon: Gem,
    title: "Gold Mining",
    description:
      "Large-scale gold extraction using state-of-the-art equipment and environmentally conscious methods that maximize yield and minimize ecological impact.",
    whatsapp: `${WHATSAPP_BASE}Gold%20Mining%20services.`,
  },
  {
    icon: Search,
    title: "Mineral Exploration",
    description:
      "Advanced geological surveying and mineral identification across Tanzania's most promising regions using cutting-edge technology.",
    whatsapp: `${WHATSAPP_BASE}Mineral%20Exploration%20services.`,
  },
  {
    icon: Factory,
    title: "Extraction & Processing",
    description:
      "Complete ore processing pipeline from extraction to refined minerals, with rigorous quality control at every stage of the process.",
    whatsapp: `${WHATSAPP_BASE}Extraction%20and%20Processing%20services.`,
  },
  {
    icon: Users,
    title: "Mining Consultation",
    description:
      "Expert advisory services for mining operations including feasibility studies, site assessments, regulatory compliance, and operational optimization.",
    whatsapp: `${WHATSAPP_BASE}Mining%20Consultation%20services.`,
  },
  {
    icon: Truck,
    title: "Equipment & Logistics",
    description:
      "Full-spectrum logistics support including heavy equipment provisioning, transportation, and supply chain management for mining operations.",
    whatsapp: `${WHATSAPP_BASE}Equipment%20and%20Logistics%20services.`,
  },
];

export function ServicesSection() {
  const { ref, isInView } = useRevealInView();

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    console.log('Inquire Now button clicked');
    
    // Method 1: Try direct scrollIntoView
    const contactElement = document.getElementById('contact');
    console.log('Contact element found:', contactElement);
    
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    
    // Method 2: Use window.location hash
    console.log('Using window.location hash');
    window.location.hash = 'contact';
    
    // Method 3: Fallback - wait and try again
    setTimeout(() => {
      const element = document.getElementById('contact');
      console.log('Retry - Contact element found:', element);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <section id="services" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.02] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Our Services"
          title="Comprehensive Mining Solutions"
          description="From exploration to extraction, we deliver end-to-end mining services powered by innovation and driven by excellence."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-sm"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top accent line */}
              <motion.div
                className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              <div className="flex flex-1 flex-col p-7">
                {/* Number + Icon row */}
                <div className="mb-6 flex items-center justify-between">
                  <motion.div
                    className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <service.icon className="h-7 w-7" />
                  </motion.div>
                  <span className="font-serif text-4xl font-bold text-primary/[0.06] transition-colors duration-300 group-hover:text-primary/[0.12]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground">{service.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                {/* CTA */}
                <motion.a
                  href="#contact"
                  onClick={scrollToContact}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Inquire Now
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {"\u2192"}
                  </motion.span>
                </motion.a>
              </div>

              {/* Hover border glow */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 ring-1 ring-primary/30 transition-opacity duration-300 group-hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
