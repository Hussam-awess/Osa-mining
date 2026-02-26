"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Sustainability", href: "#sustainability" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "#contact" },
];

const WHATSAPP_URL =
  "https://wa.me/255692811131?text=Hello%20Osa%20Mining,%20I%20would%20like%20to%20inquire%20about%20your%20services.";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollY } = useScroll();
  const [currentPath, setCurrentPath] = useState("/");

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    // Only run scroll detection on home page, not gallery
    if (currentPath !== "/") return;
    
    const handleScroll = () => {
      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_30px_oklch(0.78_0.15_75/0.1)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.a
          href="/"
          className="group relative flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative flex h-10 w-10 items-center justify-center">
            <motion.img
              src="/Osa-mining-logo.png"
              alt="OSA Mining Logo"
              className="h-8 w-8 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wider text-foreground">
              OSA <span className="text-primary">MINING</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Since 2013
            </span>
          </div>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link, i) => {
            const isActive = currentPath === "/gallery" && link.name === "Gallery" 
              || currentPath === "/" && activeSection === link.href.replace("#", "");
            
            const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
              if (link.name === "Gallery") {
                // Let the link work normally
                return;
              } else if (currentPath === "/gallery") {
                // If on gallery page and clicking non-gallery link, go to home
                e.preventDefault();
                window.location.href = "/" + link.href;
              }
              // Otherwise let the normal scroll behavior work
            };
            
            return (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={handleClick}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
                className="relative px-4 py-2 text-sm font-medium transition-colors"
              >
                <span
                  className={`relative z-10 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 rounded-lg bg-primary/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-4 lg:flex">
          <motion.a
            href="tel:+255692811131"
            className="group relative overflow-hidden rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gold-light/30"
              initial={{ x: "-100%", skewX: -15 }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Contact Us
            </span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="relative z-50 lg:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-6 w-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-6 w-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-primary/10 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => {
                const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (link.name === "Gallery") {
                    // Let the link work normally
                    setIsOpen(false);
                    return;
                  } else if (currentPath === "/gallery") {
                    // If on gallery page and clicking non-gallery link, go to home
                    e.preventDefault();
                    window.location.href = "/" + link.href;
                    setIsOpen(false);
                  } else {
                    // Normal behavior
                    setIsOpen(false);
                  }
                };
                
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={handleMobileClick}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-lg px-4 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-4 w-4" />
                Contact Us on WhatsApp
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
