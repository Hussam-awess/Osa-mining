"use client";

import { motion } from "framer-motion";

const WHATSAPP_URL =
  "https://wa.me/255692811131?text=Hello%20Osa%20Mining,%20I%20would%20like%20to%20inquire%20about%20your%20services.";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Sustainability", href: "#sustainability" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-card/30">
      {/* Gold accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <img
                  src="/Osa-mining-logo.png"
                  alt="OSA Mining Logo"
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-bold tracking-wider text-foreground">
                  OSA <span className="text-primary">MINING</span>
                </span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Leading the future of mining in Tanzania since 2013. Committed to
              excellence, safety, and sustainability.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              Get In Touch
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="tel:+255692811131" className="transition-colors hover:text-primary">
                  +255 692 811 131
                </a>
              </li>
              <li>
                <a href="tel:+255713289786" className="transition-colors hover:text-primary">
                  +255 713 289 786
                </a>
              </li>
              <li>
                <a
                  href="mailto:asadinawess@gmail.com"
                  className="transition-colors hover:text-primary"
                >
                  asadinawess@gmail.com
                </a>
              </li>
              <li>Chunya, Mbeya City, Tanzania</li>
            </ul>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              WhatsApp Us
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-4 border-t border-border/30 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Osa Mining. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Chunya, Mbeya, Tanzania
          </p>
        </div>
      </div>
    </footer>
  );
}
