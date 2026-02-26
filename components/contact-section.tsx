"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useRevealInView, fadeUp, staggerContainer } from "@/hooks/use-animations";
import { SectionHeading } from "./section-heading";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ExternalLink,
  Send,
  User,
  Building2,
  HelpCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "255692811131";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    lines: ["+255 692 811 131", "+255 713 289 786"],
    href: "tel:+255692811131",
  },
  {
    icon: Mail,
    label: "Email",
    lines: ["asadinawess@gmail.com"],
    href: "mailto:asadinawess@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    lines: ["Chunya, Mbeya City", "Tanzania"],
    href: "https://maps.google.com/?q=Chunya,Mbeya,Tanzania",
  },
];

const inquiryOptions = [
  "General Inquiry",
  "Mining Services",
  "Mineral Trading",
  "Geological Exploration",
  "Equipment & Logistics",
  "Partnership / Investment",
  "Employment / Careers",
  "Other",
];

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    inquiry: "",
    message: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const lines = [
      `Hello Osa Mining,`,
      ``,
      `*Name:* ${form.name}`,
      `*Email:* ${form.email}`,
      form.phone ? `*Phone:* ${form.phone}` : "",
      form.city || form.state
        ? `*Location:* ${[form.city, form.state].filter(Boolean).join(", ")}`
        : "",
      form.inquiry ? `*Inquiry Type:* ${form.inquiry}` : "",
      form.message ? `\n*Message:*\n${form.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const inputClasses =
    "w-full rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-sm text-foreground backdrop-blur-sm placeholder:text-muted-foreground/60 transition-colors focus:border-primary/60 focus:bg-card/60 focus:outline-none focus:ring-1 focus:ring-primary/30";
  const labelClasses =
    "mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground";

  return (
    <motion.form
      variants={fadeUp}
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border/50 bg-card/20 p-6 backdrop-blur-sm lg:p-8"
    >
      <h3 className="text-lg font-bold text-foreground">Send Us a Message</h3>
      <p className="text-sm text-muted-foreground">
        Fill out the form below and we will continue the conversation on WhatsApp.
      </p>

      {/* Name & Email */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClasses}>
            <User className="h-3.5 w-3.5" /> Name <span className="text-primary">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Your full name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClasses}>
            <Mail className="h-3.5 w-3.5" /> Email <span className="text-primary">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="contact-phone" className={labelClasses}>
          <Phone className="h-3.5 w-3.5" /> Phone Number
        </label>
        <input
          id="contact-phone"
          type="tel"
          placeholder="+255 7XX XXX XXX"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClasses}
        />
      </div>

      {/* City & State */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-city" className={labelClasses}>
            <Building2 className="h-3.5 w-3.5" /> City
          </label>
          <input
            id="contact-city"
            type="text"
            placeholder="e.g. Dar es Salaam"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-state" className={labelClasses}>
            <MapPin className="h-3.5 w-3.5" /> State / Region
          </label>
          <input
            id="contact-state"
            type="text"
            placeholder="e.g. Mbeya"
            value={form.state}
            onChange={(e) => update("state", e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      {/* Inquiry Type */}
      <div>
        <label htmlFor="contact-inquiry" className={labelClasses}>
          <HelpCircle className="h-3.5 w-3.5" /> Inquiry Type
        </label>
        <select
          id="contact-inquiry"
          value={form.inquiry}
          onChange={(e) => update("inquiry", e.target.value)}
          className={`${inputClasses} appearance-none`}
        >
          <option value="">Select an inquiry type...</option>
          {inquiryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelClasses}>
          <MessageCircle className="h-3.5 w-3.5" /> Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          placeholder="Tell us about your project or question..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClasses} resize-none`}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 50px oklch(0.78 0.15 75 / 0.25)",
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gold-light/20"
          initial={{ x: "-100%", skewX: -20 }}
          whileHover={{ x: "150%" }}
          transition={{ duration: 0.8 }}
        />
        <Send className="relative h-5 w-5" />
        <span className="relative">Submit via WhatsApp</span>
        <motion.div
          className="absolute inset-0 rounded-xl ring-2 ring-primary/50"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </motion.form>
  );
}

export function ContactSection() {
  const { ref, isInView } = useRevealInView();

  return (
    <section id="contact" className="relative overflow-hidden py-24 lg:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />

      {/* Animated accent */}
      <motion.div
        className="absolute left-1/2 top-0 h-32 w-[1px] -translate-x-1/2 bg-gradient-to-b from-primary/40 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        style={{ transformOrigin: "top" }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Contact Us"
          title="Let's Build Something Great"
          description="Ready to explore mining opportunities with us? Fill in the form and we'll continue the conversation on WhatsApp."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid gap-8 lg:grid-cols-2"
        >
          {/* Left: Contact Info Cards + Map */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                variants={fadeUp}
                href={info.href}
                target={info.label === "Location" ? "_blank" : undefined}
                rel={info.label === "Location" ? "noopener noreferrer" : undefined}
                className="group flex items-start gap-5 rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/60"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <info.icon className="h-5 w-5" />
                </motion.div>
                <div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {info.label}
                  </p>
                  {info.lines.map((line) => (
                    <p
                      key={line}
                      className="text-base font-medium text-foreground"
                    >
                      {line}
                    </p>
                  ))}
                </div>
                <ExternalLink className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}

            {/* Map */}
            <motion.div
              variants={fadeUp}
              className="overflow-hidden rounded-2xl border border-border/50"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245907.53556870965!2d33.27!3d-8.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18da6e57ad03ef8d%3A0xf8f85c8d6f08a01!2sChunya%2C%20Tanzania!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 280 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Osa Mining location - Chunya, Mbeya, Tanzania"
                className="grayscale transition-all duration-500 hover:grayscale-0"
              />
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
