import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PortableText } from "@/components/shared/PortableText";
import { getStudioPage, getSiteSettings } from "@/lib/sanity/queries";
import { StudioGallery } from "@/components/sections/StudioGallery";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Studio de Pilates Équipé à Chatou | Atelier Pile-Attitude",
    description:
      "Explorez notre studio lumineux équipé de Reformer, Cadillac, Chair, Barrel et Spine Corrector à Chatou. Un espace chaleureux dédié à la pratique du Pilates sur machines.",
    openGraph: {
      title: "Découvrir le Studio de Pilates Équipé à Chatou",
      description:
        "Studio Pilates équipé Reformer, Cadillac, Chair, Barrel — 27 avenue de Brimont, Chatou (78). À 5 min du RER A.",
      url: "https://www.atelier-pile-attitude.fr/le-studio",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Studio de Pilates Atelier Pile-Attitude — machines Reformer, Cadillac, Chair, Barrel à Chatou" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Studio Pilates Équipé à Chatou | Reformer, Cadillac, Chair, Barrel",
      description: "Découvrez notre studio lumineux équipé de toutes les machines Pilates — 27 avenue de Brimont, Chatou. À 5 min du RER A.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr/le-studio",
    },
  };
}

const MACHINES = ["Reformer", "Cadillac", "Chair", "Barrel", "Spine Corrector"];

export default async function StudioPage() {
  const [studioPage, settings] = await Promise.all([getStudioPage(), getSiteSettings()]);

  const tel = settings?.telephone ?? "+33 6 20 55 29 30";
  const email = settings?.email ?? "atelierpileattitude@gmail.com";
  const adresse = settings?.adresse ?? "27 avenue de Brimont, Chatou 78400";

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Le Studio", href: "/le-studio" }]} />

      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="pt-40 pb-16 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
            Un espace dédié au bien-être
          </p>
          <h1 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[80px] text-pile-dark">
            Découvrir le studio
          </h1>
        </AnimatedSection>
      </section>

      {/* ── Galerie ─────────────────────────────────────────────── */}
      <StudioGallery />

      {/* ── Description ─────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-[800px] mx-auto">
            {studioPage?.description && studioPage.description.length > 0 ? (
              <PortableText
                value={studioPage.description}
                className="font-inter text-[17px] text-pile-muted leading-[1.8] text-center"
              />
            ) : (
              <p className="font-inter text-[17px] text-pile-muted leading-[1.8] text-center">
                Le studio est un véritable cocon dédié au bien-être du corps et de l&apos;esprit.
                Chaleureux, calme et baigné de lumière naturelle, il offre un cadre apaisant propice
                à la détente et à la concentration. Entièrement équipé avec l&apos;ensemble des
                machines imaginées par Joseph Pilates (
                <em className="font-cormorant not-italic font-medium" style={{ color: "#8a7455" }}>Reformer</em>,{" "}
                <em className="font-cormorant not-italic font-medium" style={{ color: "#8a7455" }}>Cadillac</em>,{" "}
                <em className="font-cormorant not-italic font-medium" style={{ color: "#8a7455" }}>Chair</em>,{" "}
                <em className="font-cormorant not-italic font-medium" style={{ color: "#8a7455" }}>Barrel</em>,{" "}
                <em className="font-cormorant not-italic font-medium" style={{ color: "#8a7455" }}>Spine Corrector</em>)…
                le studio vous invite à découvrir la méthode dans toute son authenticité et sa
                richesse. Un vestiaire est également à votre disposition pour vous permettre
                d&apos;attendre vos cours et de vous changer en toute tranquillité.
              </p>
            )}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Équipements ─────────────────────────────────────────── */}
      <section className="py-12 border-t border-black/[0.06]">
        <AnimatedSection>
          <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-3 px-6">
            {MACHINES.map((machine, i) => (
              <span key={machine} className="flex items-center gap-6">
                <span className="font-cormorant italic text-[26px] md:text-[32px] text-pile-dark tracking-[0.01em]">
                  {machine}
                </span>
                {i < MACHINES.length - 1 && (
                  <span className="text-pile-violet/50 text-[10px]">◆</span>
                )}
              </span>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* ── Tarifs — bandeau horizontal ──────────────────────────── */}
      <section style={{ backgroundColor: "#f7f6f4" }}>
        <AnimatedSection>
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-14 flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div>
              <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-2">
                Tarifs
              </p>
              <p className="font-cormorant italic leading-[1.05] tracking-[-0.02em] text-[34px] md:text-[44px] text-pile-dark">
                Nos formules & tarifs
              </p>
            </div>

            <Link
              href="/tarifs"
              className="group relative inline-flex items-center justify-center w-full md:w-auto min-h-[48px] px-10 py-4 font-inter text-[11px] uppercase tracking-[0.22em] text-pile-dark border border-pile-dark overflow-hidden transition-colors duration-300 hover:text-white hover:border-pile-violet rounded-[2px] flex-shrink-0"
            >
              <span
                className="absolute inset-0 bg-pile-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                aria-hidden="true"
              />
              <span className="relative">Voir les tarifs</span>
            </Link>

          </div>
        </AnimatedSection>
      </section>

      {/* ── Contact + Carte ─────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">

          <AnimatedSection>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-10 md:mb-14">
              Nous trouver
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

            {/* Infos contact */}
            <AnimatedSection>
              <div className="space-y-8">

                {/* Adresse */}
                <div className="flex items-start gap-4">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pile-violet mt-0.5 flex-shrink-0" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    <circle cx="12" cy="9" r="2.5"/>
                  </svg>
                  <div>
                    <p className="font-inter text-[11px] uppercase tracking-[0.12em] text-pile-dark/40 mb-1">Adresse</p>
                    <p className="font-inter text-[16px] text-pile-dark leading-[1.6]">{adresse}</p>
                    <p className="font-inter text-[13px] text-pile-muted mt-1">À 5 min à pied du RER A — Chatou-Croissy</p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-4">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pile-violet mt-0.5 flex-shrink-0" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.72A2 2 0 012 .9h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <div>
                    <p className="font-inter text-[11px] uppercase tracking-[0.12em] text-pile-dark/40 mb-1">Téléphone</p>
                    <a href={`tel:${tel.replace(/\s/g, "")}`} className="font-inter text-[16px] text-pile-dark hover:text-pile-violet transition-colors duration-200">
                      {tel}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pile-violet mt-0.5 flex-shrink-0" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div>
                    <p className="font-inter text-[11px] uppercase tracking-[0.12em] text-pile-dark/40 mb-1">Email</p>
                    <a href={`mailto:${email}`} className="font-inter text-[16px] text-pile-dark hover:text-pile-violet transition-colors duration-200">
                      {email}
                    </a>
                  </div>
                </div>

              </div>
            </AnimatedSection>

            {/* Carte Google Maps */}
            <AnimatedSection delay={0.15}>
              <div className="w-full overflow-hidden">
                <iframe
                  title="Atelier Pile-Attitude — 27 avenue de Brimont, Chatou"
                  src="https://maps.google.com/maps?q=27+avenue+de+Brimont,+Chatou+78400,+France&output=embed&z=15"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimatedSection>

          </div>
        </div>
      </section>

    </div>
  );
}
