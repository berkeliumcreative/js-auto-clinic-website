// @ts-nocheck
"use client";

import content from "../data/content.json";
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
  Instagram,
  Facebook,
} from "lucide-react";
import { useState, useEffect } from "react";

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

function SocialIcon({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  const icons: Record<string, React.ReactNode> = {
    instagram: <Instagram className="w-5 h-5" />,
    facebook: <Facebook className="w-5 h-5" />,
    yelp: <span className="text-sm font-bold">Y</span>,
    tiktok: <span className="text-sm font-bold">T</span>,
  };
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
      className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--accent)] transition-colors duration-200 cursor-pointer"
    >
      {icons[platform] || <span className="text-sm font-bold">{platform.charAt(0).toUpperCase()}</span>}
    </a>
  );
}

function AnimateIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={setRef}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
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
          <a href="#" className="text-xl font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            <span style={{ color: "var(--accent)" }}>{content.businessName.split(" ")[0]}</span>{" "}
            {content.businessName.split(" ").slice(1).join(" ")}
          </a>

          <div className="hidden md:flex items-center gap-8">
            {["About", "Services", "Reviews", "Hours", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer">
                {item}
              </a>
            ))}
            <a
              href={`tel:${content.contact.phone}`}
              className="flex items-center gap-2 text-sm font-semibold text-white px-5 py-2.5 rounded-full transition-all duration-200 hover:brightness-110 cursor-pointer"
              style={{ background: "var(--accent)" }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white cursor-pointer" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4">
            {["About", "Services", "Reviews", "Hours", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="block text-slate-400 hover:text-white transition-colors cursor-pointer">
                {item}
              </a>
            ))}
            <a href={`tel:${content.contact.phone}`} className="block text-center font-semibold text-white px-5 py-3 rounded-full cursor-pointer" style={{ background: "var(--accent)" }}>
              Call Now
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section — NO animation dependency, always visible */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
        <div className="absolute inset-0 opacity-30" style={{ background: `radial-gradient(ellipse at 50% 30%, var(--accent), transparent 60%)` }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-[fadeIn_0.6s_ease_0.1s_both]">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-slate-300">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {content.tagline}
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1] text-white animate-[fadeIn_0.6s_ease_0.2s_both]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {content.hero.heading}
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-[fadeIn_0.6s_ease_0.3s_both]">
            {content.hero.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeIn_0.6s_ease_0.4s_both]">
            <a
              href={content.hero.ctaLink}
              className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:brightness-110 hover:scale-[1.02] cursor-pointer shadow-lg"
              style={{ background: "var(--accent)" }}
            >
              {content.hero.ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
            {secondaryCtaText && secondaryCtaLink && (
              <a
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-4 rounded-full text-lg border border-white/20 hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {secondaryCtaText}
              </a>
            )}
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto animate-[fadeIn_0.6s_ease_0.5s_both]">
            {[
              { value: content.services.length + "+", label: "Services" },
              { value: "5.0", label: "Rating" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white" style={{ color: "var(--accent)" }}>{stat.value}</p>
                <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <AnimateIn className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Our Story</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>
              {content.about.heading}
            </h2>
          </div>
          {content.about.paragraphs.map((paragraph, i) => (
            <p key={i} className="text-lg text-slate-300 mb-6 leading-relaxed text-center">{paragraph}</p>
          ))}
        </AnimateIn>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6" style={{ background: "rgba(17,24,39,0.5)" }}>
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>What We Do</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>Our Services</h2>
          </AnimateIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.services.map((service, i) => {
              const Icon = getIcon(service.icon);
              return (
                <AnimateIn key={i} delay={i * 0.08}>
                  <div className="group relative bg-[#111827] border border-[#1e293b] rounded-2xl p-8 hover:border-[var(--accent)] transition-all duration-300 cursor-pointer h-full">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(59,130,246,0.15)" }}>
                      <Icon className="w-7 h-7" style={{ color: "var(--accent)" }} />
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>{service.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{service.description}</p>
                    <ChevronRight className="absolute top-8 right-8 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color: "var(--accent)" }} />
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      {reviews && reviews.length > 0 && (
        <section id="reviews" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <AnimateIn className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Testimonials</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>What Our Customers Say</h2>
            </AnimateIn>

            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review, i) => (
                <AnimateIn key={i} delay={i * 0.1}>
                  <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-8 h-full">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.rating }).map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-300 mb-6 leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: "var(--accent)" }}>
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-white">{review.name}</span>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hours Section */}
      <section id="hours" className="py-24 px-6" style={{ background: "rgba(17,24,39,0.5)" }}>
        <AnimateIn className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Visit Us</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>Hours of Operation</h2>
          </div>

          <div className="bg-[#111827] border border-[#1e293b] rounded-2xl p-8">
            {Object.entries(content.contact.hours).map(([day, hours], i, arr) => (
              <div key={day} className={`flex justify-between items-center py-4 ${i < arr.length - 1 ? "border-b border-[#1e293b]" : ""}`}>
                <span className="font-medium text-white flex items-center gap-3">
                  <Clock className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  {day}
                </span>
                <span className="text-slate-400">{hours}</span>
              </div>
            ))}
          </div>
        </AnimateIn>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "var(--accent)" }}>Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-white" style={{ fontFamily: "var(--font-heading)" }}>Contact Us</h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: MapPin, label: "Address", value: content.contact.address, href: `https://maps.google.com/?q=${content.contact.mapEmbedQuery}` },
              { icon: Phone, label: "Phone", value: content.contact.phone, href: `tel:${content.contact.phone}` },
              { icon: Mail, label: "Email", value: content.contact.email, href: `mailto:${content.contact.email}` },
            ].map((item, i) => (
              <AnimateIn key={i} delay={i * 0.1}>
                <a
                  href={item.href}
                  target={item.icon === MapPin ? "_blank" : undefined}
                  rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center text-center bg-[#111827] border border-[#1e293b] rounded-2xl p-8 hover:border-[var(--accent)] transition-all duration-300 cursor-pointer block h-full"
                >
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(59,130,246,0.15)" }}>
                    <item.icon className="w-7 h-7" style={{ color: "var(--accent)" }} />
                  </div>
                  <p className="text-sm text-slate-400 mb-1">{item.label}</p>
                  <p className="font-semibold text-white">{item.value}</p>
                </a>
              </AnimateIn>
            ))}
          </div>

          <AnimateIn>
            <div className="rounded-2xl overflow-hidden border border-[#1e293b] h-[350px]">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCrMkpaVV1d0GDQZTXjwOs9mzdwRGs2aro&q=${content.contact.mapEmbedQuery}`}
                title="Business Location"
              />
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6">
        <AnimateIn className="max-w-4xl mx-auto">
          <div className="text-center rounded-3xl p-12 md:p-16 relative overflow-hidden" style={{ background: "var(--accent)" }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Ready to Get Started?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
                Contact us today and experience the difference quality service makes.
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
          </div>
        </AnimateIn>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <p className="text-xl font-bold mb-1 text-white" style={{ fontFamily: "var(--font-heading)" }}>{content.businessName}</p>
              <p className="text-sm text-slate-400">{content.tagline}</p>
            </div>

            {social && (
              <div className="flex gap-3">
                {Object.entries(social).map(
                  ([platform, url]) =>
                    url && platform !== "bookingUrl" && (
                      <SocialIcon key={platform} platform={platform} url={url} />
                    )
                )}
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-[#1e293b] text-center text-sm text-slate-500">
            <p>&copy; {new Date().getFullYear()} {content.businessName}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
