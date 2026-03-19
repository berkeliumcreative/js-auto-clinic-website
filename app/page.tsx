// @ts-nocheck
"use client";

import content from "../data/content.json";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Spotlight } from "@/components/ui/spotlight";
import { Particles } from "@/components/ui/particles";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { NumberTicker } from "@/components/ui/number-ticker";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { LampContainer } from "@/components/ui/lamp";
import {
  Phone, MapPin, Mail, Clock, Star, Wrench, Scissors, Car, Sparkles,
  Shield, Heart, Calendar, Users, Award, ArrowRight, Menu, X,
  Instagram, Facebook, ExternalLink, ChevronLeft, ChevronRight,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";

/* ─── Types ─── */
type ContentType = typeof content & {
  gallery?: { heading?: string; subheading?: string; images?: { url: string; alt: string }[] };
  social?: Record<string, string>;
  reviews?: { name: string; rating: number; text: string; timeAgo?: string }[];
};
const c = content as ContentType;

/* ─── Icon Map ─── */
const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  wrench: Wrench, scissors: Scissors, car: Car, sparkles: Sparkles,
  shield: Shield, heart: Heart, calendar: Calendar, users: Users,
  award: Award, phone: Phone, star: Star, clock: Clock,
  check: CheckCircle,
};

/* ─── Social Icon ─── */
function SocialLink({ platform, url }: { platform: string; url: string }) {
  if (!url) return null;
  const icon: Record<string, React.ReactNode> = {
    instagram: <Instagram className="size-4" />,
    facebook: <Facebook className="size-4" />,
    yelp: <span className="text-xs font-bold leading-none">Y!</span>,
    tiktok: <span className="text-xs font-bold leading-none">TT</span>,
  };
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}
      className="size-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--theme-accent)] hover:bg-[var(--theme-accent)]/10 transition-all duration-200 cursor-pointer">
      {icon[platform] || <ExternalLink className="size-4" />}
    </a>
  );
}

/* ─── Gallery Carousel ─── */
function Gallery() {
  const images = c.gallery?.images;
  if (!images?.length) return null;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section id="gallery" className="py-28 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <BlurFade delay={0.1} inView className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">
            {c.gallery?.heading || "Gallery"}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            {c.gallery?.subheading || "See Our Work"}
          </h2>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <div className="relative">
            <div ref={emblaRef} className="overflow-hidden rounded-2xl">
              <div className="flex gap-4">
                {images.map((img, i) => (
                  <div key={i} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-neutral-900 ring-1 ring-white/5">
                      <img src={img.url} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {images.length > 3 && (
              <div className="flex justify-center gap-3 mt-8">
                <button onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev}
                  className="size-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-[var(--theme-accent)]/50 disabled:opacity-30 transition cursor-pointer">
                  <ChevronLeft className="size-5 text-white" />
                </button>
                <button onClick={() => emblaApi?.scrollNext()} disabled={!canNext}
                  className="size-11 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-[var(--theme-accent)]/50 disabled:opacity-30 transition cursor-pointer">
                  <ChevronRight className="size-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const heroImg = (c.hero as Record<string, unknown>).backgroundImage as string | undefined;
  const aboutImg = (c.about as Record<string, unknown>).image as string | undefined;
  const secondaryCta = (c.hero as Record<string, unknown>).secondaryCtaText as string | undefined;
  const secondaryLink = (c.hero as Record<string, unknown>).secondaryCtaLink as string | undefined;

  const navLinks = ["About", "Services", ...(c.gallery?.images?.length ? ["Gallery"] : []), ...(c.reviews?.length ? ["Reviews"] : []), "Hours", "Contact"];

  // Transform reviews for InfiniteMovingCards
  const reviewCards = c.reviews?.map(r => ({
    quote: r.text,
    name: r.name,
    title: r.timeAgo || "Customer",
  })) || [];

  return (
    <main className="overflow-x-hidden bg-neutral-950">

      {/* ━━━ NAV ━━━ */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-neutral-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="text-lg font-bold tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>
            <span className="text-[var(--theme-accent)]">{c.businessName.split(" ")[0]}</span>{" "}
            <span className="text-white">{c.businessName.split(" ").slice(1).join(" ")}</span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 cursor-pointer">
                {item}
              </a>
            ))}
            <ShimmerButton
              shimmerColor="var(--theme-accent)"
              background="var(--theme-accent)"
              borderRadius="9999px"
              shimmerSize="0.08em"
              className="!h-9 !px-5"
            >
              <a href={`tel:${c.contact.phone}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                <Phone className="size-3.5" /> Call Now
              </a>
            </ShimmerButton>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white cursor-pointer" aria-label="Menu">
            {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-neutral-950/95 backdrop-blur-2xl border-t border-white/5 px-6 py-5 space-y-4"
          >
            {navLinks.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="block text-white/60 hover:text-white transition-colors cursor-pointer">{item}</a>
            ))}
            <a href={`tel:${c.contact.phone}`}
              className="block text-center font-semibold text-white px-5 py-3 rounded-full cursor-pointer"
              style={{ backgroundColor: "var(--theme-accent)" }}>Call Now</a>
          </motion.div>
        )}
      </nav>

      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-[100dvh] flex items-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Layered Background */}
        {heroImg ? (
          <>
            <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950" />
          </>
        ) : (
          <div className="absolute inset-0 bg-neutral-950" />
        )}

        {/* Particles overlay */}
        <Particles
          className="absolute inset-0 z-[1]"
          quantity={80}
          color="var(--theme-accent)"
          size={0.4}
          staticity={40}
          ease={60}
        />

        {/* Spotlight */}
        <Spotlight className="absolute -top-40 left-0 md:left-60 z-[2]" fill="var(--theme-accent)" />

        {/* Accent glow */}
        <div className="absolute inset-0 z-[1]" style={{ background: `radial-gradient(ellipse at 50% 20%, color-mix(in srgb, var(--theme-accent) 15%, transparent), transparent 60%)` }} />

        <div className="relative z-10 max-w-4xl mx-auto text-center w-full py-20">
          <BlurFade delay={0.1} inView>
            <Badge variant="outline" className="mb-8 px-4 py-1.5 text-sm border-white/10 text-white/70 backdrop-blur-sm bg-white/5">
              <Star className="size-3.5 text-yellow-400 fill-yellow-400 mr-1.5" />
              {c.tagline}
            </Badge>
          </BlurFade>

          <div className="mb-8">
            <TextGenerateEffect
              words={c.hero.heading}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
              duration={0.6}
            />
          </div>

          <BlurFade delay={0.4} inView>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12">
              {c.hero.subheading}
            </p>
          </BlurFade>

          <BlurFade delay={0.6} inView>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ShimmerButton
                shimmerColor="#ffffff"
                background="var(--theme-accent)"
                borderRadius="9999px"
                shimmerSize="0.06em"
                className="!px-8 !py-3.5"
              >
                <a href={c.hero.ctaLink} className="inline-flex items-center gap-2 text-white font-semibold text-base">
                  {c.hero.ctaText} <ArrowRight className="size-4" />
                </a>
              </ShimmerButton>
              {secondaryCta && secondaryLink && (
                <a href={secondaryLink}
                  className="inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3.5 rounded-full text-base border border-white/10 hover:bg-white/5 transition-all cursor-pointer backdrop-blur-sm">
                  {secondaryCta}
                </a>
              )}
            </div>
          </BlurFade>

          {/* Animated Stats */}
          <BlurFade delay={0.8} inView>
            <div className="mt-24 grid grid-cols-3 gap-8 max-w-md mx-auto">
              {[
                { val: c.services.length, suffix: "+", label: "Services" },
                { val: 5, suffix: ".0", label: "Rating", decimal: 1 },
                { val: 100, suffix: "%", label: "Satisfaction" },
              ].map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold" style={{ color: "var(--theme-accent)" }}>
                    <NumberTicker value={s.val} decimalPlaces={s.decimal || 0} delay={0.3 + i * 0.15} />{s.suffix}
                  </p>
                  <p className="text-xs text-white/30 mt-2 uppercase tracking-[0.15em]">{s.label}</p>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-950 to-transparent z-[3]" />
      </section>

      {/* ━━━ ABOUT ━━━ */}
      <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`grid ${aboutImg ? "lg:grid-cols-2" : "grid-cols-1 max-w-3xl mx-auto"} gap-12 lg:gap-20 items-center`}>
            <div>
              <BlurFade delay={0.1} inView>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">Our Story</p>
              </BlurFade>
              <BlurFade delay={0.2} inView>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-10 leading-tight" style={{ fontFamily: "var(--font-heading)" }}>
                  {c.about.heading}
                </h2>
              </BlurFade>
              {c.about.paragraphs.map((p, i) => (
                <BlurFade key={i} delay={0.3 + i * 0.1} inView>
                  <p className="text-white/50 text-base leading-relaxed mb-6">{p}</p>
                </BlurFade>
              ))}
            </div>

            {aboutImg && (
              <BlurFade delay={0.3} inView direction="left">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/5 relative group">
                  <img src={aboutImg} alt={c.businessName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
                </div>
              </BlurFade>
            )}
          </div>
        </div>
      </section>

      {/* ━━━ SERVICES ━━━ */}
      <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 relative">
        {/* Subtle accent glow behind services */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, color-mix(in srgb, var(--theme-accent) 6%, transparent), transparent 50%)` }} />

        <div className="max-w-7xl mx-auto relative">
          <BlurFade delay={0.1} inView className="text-center mb-16">
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>Our Services</h2>
          </BlurFade>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.services.map((svc, i) => {
              const Icon = ICONS[svc.icon] || Sparkles;
              const price = (svc as Record<string, unknown>).price as string | undefined;
              return (
                <BlurFade key={i} delay={0.15 + i * 0.08} inView>
                  <Card className="group bg-neutral-900/50 border-white/5 hover:border-[var(--theme-accent)]/20 hover:bg-neutral-900/80 transition-all duration-500 cursor-pointer h-full backdrop-blur-sm">
                    <CardContent className="pt-7 pb-6">
                      <div className="flex items-start justify-between mb-5">
                        <div className="size-12 rounded-xl flex items-center justify-center ring-1 ring-white/5" style={{ backgroundColor: "color-mix(in srgb, var(--theme-accent) 10%, transparent)" }}>
                          <Icon className="size-5" style={{ color: "var(--theme-accent)" }} />
                        </div>
                        {price && (
                          <span className="text-sm font-semibold text-[var(--theme-accent)] bg-[var(--theme-accent)]/10 px-3 py-1 rounded-full">{price}</span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "var(--font-heading)" }}>{svc.title}</h3>
                      <p className="text-sm text-white/40 leading-relaxed">{svc.description}</p>
                    </CardContent>
                  </Card>
                </BlurFade>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ GALLERY ━━━ */}
      <Gallery />

      {/* ━━━ REVIEWS (Infinite Moving Cards) ━━━ */}
      {reviewCards.length > 0 && (
        <section id="reviews" className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <BlurFade delay={0.1} inView className="text-center mb-16">
              <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">Testimonials</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
                What Our Customers Say
              </h2>
            </BlurFade>
          </div>

          <BlurFade delay={0.2} inView>
            <InfiniteMovingCards
              items={reviewCards}
              direction="left"
              speed="slow"
              pauseOnHover
            />
          </BlurFade>
        </section>
      )}

      {/* ━━━ HOURS & CONTACT ━━━ */}
      <section id="hours" className="py-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Hours Card */}
            <BlurFade delay={0.1} inView>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">Visit Us</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10" style={{ fontFamily: "var(--font-heading)" }}>Hours of Operation</h2>
                <Card className="bg-neutral-900/50 border-white/5 backdrop-blur-sm">
                  <CardContent className="pt-4">
                    {Object.entries(c.contact.hours).map(([day, hrs], i, arr) => (
                      <div key={day} className={`flex justify-between items-center py-4 ${i < arr.length - 1 ? "border-b border-white/5" : ""}`}>
                        <span className="text-sm font-medium text-white flex items-center gap-2.5">
                          <Clock className="size-3.5" style={{ color: "var(--theme-accent)" }} />
                          {day}
                        </span>
                        <span className={`text-sm ${hrs === "Closed" ? "text-red-400/70" : "text-white/50"}`}>{hrs}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </BlurFade>

            {/* Contact Info */}
            <BlurFade delay={0.2} inView>
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--theme-accent)] mb-4">Get In Touch</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10" style={{ fontFamily: "var(--font-heading)" }}>Contact Us</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapPin, label: "Address", value: c.contact.address, href: `https://maps.google.com/?q=${c.contact.mapEmbedQuery}`, external: true },
                    { icon: Phone, label: "Phone", value: c.contact.phone, href: `tel:${c.contact.phone}` },
                    { icon: Mail, label: "Email", value: c.contact.email, href: `mailto:${c.contact.email}` },
                  ].map((item, i) => (
                    <a key={i} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-neutral-900/30 hover:border-[var(--theme-accent)]/20 hover:bg-neutral-900/60 transition-all duration-300 cursor-pointer group">
                      <div className="size-11 rounded-lg flex items-center justify-center shrink-0 ring-1 ring-white/5" style={{ backgroundColor: "color-mix(in srgb, var(--theme-accent) 10%, transparent)" }}>
                        <item.icon className="size-5" style={{ color: "var(--theme-accent)" }} />
                      </div>
                      <div>
                        <p className="text-xs text-white/30 mb-0.5">{item.label}</p>
                        <p className="text-sm font-medium text-white/80 group-hover:text-[var(--theme-accent)] transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Map */}
          <BlurFade delay={0.3} inView className="mt-12">
            <div className="rounded-2xl overflow-hidden border border-white/5 h-[320px] ring-1 ring-white/5">
              <iframe
                width="100%" height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCrMkpaVV1d0GDQZTXjwOs9mzdwRGs2aro&q=${c.contact.mapEmbedQuery}`}
                title="Location"
              />
            </div>
          </BlurFade>
        </div>
      </section>

      {/* ━━━ CTA with Lamp Effect ━━━ */}
      <section id="contact" className="relative overflow-hidden">
        <LampContainer>
          <BlurFade delay={0.2} inView className="text-center relative z-10 -mt-20">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Ready to Get Started?
            </h2>
            <p className="text-white/40 mb-10 max-w-md mx-auto text-lg">
              Contact us today and experience the difference.
            </p>
            <ShimmerButton
              shimmerColor="#ffffff"
              background="var(--theme-accent)"
              borderRadius="9999px"
              shimmerSize="0.06em"
              className="!px-8 !py-4 mx-auto"
            >
              <a href={`tel:${c.contact.phone}`} className="inline-flex items-center gap-2 text-white font-semibold text-base">
                <Phone className="size-4" /> {c.contact.phone}
              </a>
            </ShimmerButton>
          </BlurFade>
        </LampContainer>
      </section>

      {/* ━━━ FOOTER ━━━ */}
      <footer className="border-t border-white/5 py-10 px-4 sm:px-6 lg:px-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-base font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>{c.businessName}</p>
            <p className="text-sm text-white/30 mt-0.5">{c.tagline}</p>
          </div>

          {c.social && (
            <div className="flex gap-2.5">
              {Object.entries(c.social).filter(([k, v]) => v && k !== "bookingUrl").map(([platform, url]) => (
                <SocialLink key={platform} platform={platform} url={url} />
              ))}
            </div>
          )}
        </div>

        <Separator className="my-6 bg-white/5" />

        <p className="text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} {c.businessName}. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
