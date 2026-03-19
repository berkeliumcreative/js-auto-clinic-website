"use client";

import content from "../data/content.json";
import { motion } from "framer-motion";
import {
  Phone,
  MapPin,
  Mail,
  Clock,
  Star,
  ChevronRight,
  Wrench,
  Scissors,
  Car,
  Sparkles,
  Shield,
  Heart,
  Calendar,
  Users,
  Award,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench,
  scissors: Scissors,
  car: Car,
  sparkles: Sparkles,
  shield: Shield,
  heart: Heart,
  calendar: Calendar,
  users: Users,
  award: Award,
  phone: Phone,
  star: Star,
  clock: Clock,
};

function getIcon(name: string) {
  return ICON_MAP[name] || Sparkles;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  const labels: Record<string, string> = {
    instagram: "Instagram",
    facebook: "Facebook",
    yelp: "Yelp",
    tiktok: "TikTok",
  };
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={labels[platform] || platform}
      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] transition-colors duration-200 cursor-pointer"
    >
      <span className="text-sm font-semibold uppercase">
        {platform.charAt(0).toUpperCase()}
      </span>
    </a>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const social = (content as Record<string, unknown>).social as
    | Record<string, string>
    | undefined;
  const reviews = (content as Record<string, unknown>).reviews as
    | Array<{ name: string; rating: number; text: string }>
    | undefined;
  const secondaryCtaText = (content.hero as Record<string, unknown>)
    .secondaryCtaText as string | undefined;
  const secondaryCtaLink = (content.hero as Record<string, unknown>)
    .secondaryCtaLink as string | undefined;

  return (
    <main className="overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#030712]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="#"
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            <span style={{ color: "var(--accent)" }}>
              {content.businessName.split(" ")[0]}
            </span>{" "}
            {content.businessName.split(" ").slice(1).join(" ")}
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Reviews", "Hours", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-[var(--text-muted)] hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {item}
                </a>
              )
            )}
            <a
              href={`tel:${content.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110 cursor-pointer"
              style={{ background: "var(--accent)" }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4">
            {["About", "Services", "Reviews", "Hours", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
                >
                  {item}
                </a>
              )
            )}
            <a
              href={`tel:${content.contact.phone}`}
              className="block text-center font-semibold text-white px-5 py-3 rounded-full cursor-pointer"
              style={{ background: "var(--accent)" }}
            >
              Call Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Gradient Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, var(--accent), transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-[var(--text-muted)]">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {content.tagline}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.hero.heading}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-[var(--text-muted)] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {content.hero.subheading}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href={content.hero.ctaLink}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] cursor-pointer"
              style={{ background: "var(--accent)" }}
            >
              {content.hero.ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
            {secondaryCtaText && secondaryCtaLink && (
              <a
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                {secondaryCtaText}
              </a>
            )}
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={fadeUp}
            className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              {
                value: content.services.length + "+",
                label: "Services",
              },
              {
                value: (content as Record<string, unknown>).rating
                  ? String((content as Record<string, unknown>).rating)
                  : "5.0",
                label: "Rating",
              },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p
                  className="text-2xl md:text-3xl font-bold"
                  style={{ color: "var(--accent)" }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Our Story
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {content.about.heading}
            </h2>
          </motion.div>
          {content.about.paragraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              className="text-lg text-[var(--text-muted)] mb-6 leading-relaxed text-center"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6 bg-[var(--bg-card)]/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              What We Do
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Our Services
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="group relative bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/30 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300"
                    style={{
                      background: "color-mix(in srgb, var(--accent) 15%, transparent)",
                    }}
                  >
                    <Icon
                      className="w-7 h-7"
                      style={{ color: "var(--accent)" }}
                    />
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                  <ChevronRight
                    className="absolute top-8 right-8 w-5 h-5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: "var(--accent)" }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section id="reviews" className="py-24 px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="max-w-6xl mx-auto"
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <span
                className="text-sm font-semibold tracking-widest uppercase"
                style={{ color: "var(--accent)" }}
              >
                Testimonials
              </span>
              <h2
                className="text-3xl md:text-5xl font-bold mt-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                What Our Customers Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: review.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      />
                    ))}
                  </div>
                  <p className="text-[var(--text-muted)] mb-6 leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "var(--accent)" }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <span className="font-semibold">{review.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Hours Section */}
      <section id="hours" className="py-24 px-6 bg-[var(--bg-card)]/50">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Visit Us
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Hours of Operation
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8"
          >
            {Object.entries(content.contact.hours).map(
              ([day, hours], i, arr) => (
                <div
                  key={day}
                  className={`flex justify-between items-center py-4 ${
                    i < arr.length - 1
                      ? "border-b border-[var(--border)]"
                      : ""
                  }`}
                >
                  <span className="font-medium flex items-center gap-3">
                    <Clock
                      className="w-4 h-4"
                      style={{ color: "var(--accent)" }}
                    />
                    {day}
                  </span>
                  <span className="text-[var(--text-muted)]">{hours}</span>
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span
              className="text-sm font-semibold tracking-widest uppercase"
              style={{ color: "var(--accent)" }}
            >
              Get In Touch
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold mt-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Contact Us
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: MapPin,
                label: "Address",
                value: content.contact.address,
                href: `https://maps.google.com/?q=${content.contact.mapEmbedQuery}`,
              },
              {
                icon: Phone,
                label: "Phone",
                value: content.contact.phone,
                href: `tel:${content.contact.phone}`,
              },
              {
                icon: Mail,
                label: "Email",
                value: content.contact.email,
                href: `mailto:${content.contact.email}`,
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                variants={fadeUp}
                href={item.href}
                target={item.icon === MapPin ? "_blank" : undefined}
                rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                className="flex flex-col items-center text-center bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 hover:border-[var(--accent)]/30 transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      "color-mix(in srgb, var(--accent) 15%, transparent)",
                  }}
                >
                  <item.icon
                    className="w-7 h-7"
                    style={{ color: "var(--accent)" }}
                  />
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-1">
                  {item.label}
                </p>
                <p className="font-semibold">{item.value}</p>
              </motion.a>
            ))}
          </div>

          {/* Map */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl overflow-hidden border border-[var(--border)] h-[350px]"
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCrMkpaVV1d0GDQZTXjwOs9mzdwRGs2aro&q=${content.contact.mapEmbedQuery}`}
              title="Business Location"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 md:p-16 relative overflow-hidden"
          style={{ background: "var(--accent)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          <div className="relative z-10">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Contact us today and experience the difference quality service
              makes.
            </p>
            <a
              href={`tel:${content.contact.phone}`}
              className="inline-flex items-center gap-2 bg-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:scale-[1.02] cursor-pointer"
              style={{ color: "var(--accent)" }}
            >
              <Phone className="w-5 h-5" />
              {content.contact.phone}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p
                className="text-xl font-bold mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {content.businessName}
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                {content.tagline}
              </p>
            </div>

            {/* Social Links */}
            {social && (
              <div className="flex gap-3">
                {Object.entries(social).map(
                  ([platform, url]) =>
                    url &&
                    platform !== "bookingUrl" && (
                      <SocialIcon
                        key={platform}
                        platform={platform}
                        url={url}
                      />
                    )
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border)] text-center text-sm text-[var(--text-muted)]">
            <p>
              &copy; {new Date().getFullYear()} {content.businessName}. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
