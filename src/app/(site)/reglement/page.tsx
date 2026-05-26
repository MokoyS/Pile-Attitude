import type { Metadata } from "next";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Règlement Intérieur | L'Atelier Pile-Attitude Chatou",
    description:
      "Consultez le règlement intérieur de l'Atelier Pile-Attitude à Chatou : conditions d'inscription, politique d'annulation et modalités de paiement des cours de Pilates.",
    openGraph: {
      title: "Règlement Intérieur | L'Atelier Pile-Attitude Chatou",
      description: "Règles de fonctionnement du studio Pilates Pile-Attitude — cours machines, collectifs tapis et cartes séances.",
      url: "https://www.atelier-pile-attitude.fr/reglement",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Règlement intérieur — Atelier Pile-Attitude, studio Pilates Chatou" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Règlement Intérieur | Atelier Pile-Attitude — Studio Pilates Chatou",
      description: "Conditions d'inscription, politique d'annulation et modalités des cartes séances du studio Pilates Pile-Attitude à Chatou.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr/reglement",
    },
  };
}

export default function ReglementPage() {
  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Règlement intérieur", href: "/reglement" }]} />
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row gap-0">

          {/* ── Colonne gauche — sticky ────────────────────── */}
          <div className="w-full md:w-[38%] flex-shrink-0 md:sticky md:top-[56px] md:self-start pt-40 pb-16 md:pb-40 pr-0 md:pr-20 border-b md:border-b-0 md:border-r border-[#eeeeee]">
            <AnimatedSection>
              <p className="font-inter text-[11px] uppercase tracking-[0.15em] text-pile-violet mb-6">
                Règlement
              </p>
              <h1
                className="font-cormorant italic text-pile-dark leading-[0.9] tracking-[-0.02em]"
                style={{ fontSize: "clamp(48px, 4.5vw, 68px)" }}
              >
                Règlement
                <br />
                intérieur
              </h1>
              <div className="mt-10 w-8 h-px bg-pile-violet/40" />
              <p className="font-inter text-[13px] text-pile-muted leading-[1.7] mt-8 max-w-[240px]">
                Merci de prendre connaissance des règles de fonctionnement de l'Atelier Pile-Attitude.
              </p>
            </AnimatedSection>
          </div>

          {/* ── Colonne droite — articles ──────────────────── */}
          <div className="flex-1 pt-16 md:pt-40 pb-32 pl-0 md:pl-20">
            <div className="space-y-0">

              {/* ── Article 01 ── */}
              <AnimatedSection>
                <div className="py-12 border-b border-[#eeeeee]">
                  <div className="flex items-baseline gap-5 mb-5">
                    <span className="font-inter text-[11px] text-pile-dark/25 tracking-[0.1em] font-light flex-shrink-0">
                      01
                    </span>
                    <h2 className="font-inter uppercase tracking-[0.18em] text-[11px] text-pile-dark font-medium">
                      Cours collectifs tapis
                    </h2>
                  </div>
                  <p className="font-inter text-[15px] text-pile-muted leading-[1.8] max-w-lg pl-[52px]">
                    Les cours tapis sont dispensés de septembre à juin hors périodes de vacances scolaires. La cotisation est due pour l'année et réglée au début de l'inscription dans sa totalité. Aucun remboursement ne sera effectué.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Article 02 ── */}
              <AnimatedSection delay={0.08}>
                <div className="py-12 border-b border-[#eeeeee]">
                  <div className="flex items-baseline gap-5 mb-5">
                    <span className="font-inter text-[11px] text-pile-dark/25 tracking-[0.1em] font-light flex-shrink-0">
                      02
                    </span>
                    <h2 className="font-inter uppercase tracking-[0.18em] text-[11px] text-pile-dark font-medium">
                      Séances machines
                    </h2>
                  </div>
                  <p className="font-inter text-[15px] text-pile-muted leading-[1.8] max-w-lg pl-[52px]">
                    Les séances machines sont sans engagement. En revanche, une séance annulée le jour même ou la veille est due.
                  </p>
                </div>
              </AnimatedSection>

              {/* ── Article 03 ── */}
              <AnimatedSection delay={0.16}>
                <div className="py-12">
                  <div className="flex items-baseline gap-5 mb-5">
                    <span className="font-inter text-[11px] text-pile-dark/25 tracking-[0.1em] font-light flex-shrink-0">
                      03
                    </span>
                    <h2 className="font-inter uppercase tracking-[0.18em] text-[11px] text-pile-dark font-medium">
                      Cartes de séances
                    </h2>
                  </div>
                  <p className="font-inter text-[15px] text-pile-muted leading-[1.8] max-w-lg pl-[52px]">
                    L'abonnement pour une carte de 5 ou de 10 séances est nominatif. La carte est valable{" "}
                    <strong className="font-semibold text-pile-dark">2 ou 4 mois</strong>{" "}
                    en fonction du nombre de cours choisis. Au-delà, une place en séance machines ne peut être garantie, peu importe le motif des absences.
                  </p>
                </div>
              </AnimatedSection>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
