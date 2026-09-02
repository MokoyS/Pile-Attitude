import type { Metadata } from "next";
import type { Tarif } from "@/types/sanity.types";
import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";
import { getTarifs } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tarifs Pilates Machines & Tapis | Atelier Pile-Attitude",
    description:
      "Découvrez nos formules Pilates à Chatou : séances Solo, Duo, Trio sur machines et cours collectifs au tapis. Cartes 5 ou 10 séances disponibles. Séance découverte à 30 €.",
    openGraph: {
      title: "Tarifs Cours Pilates Machines & Tapis | Chatou (78)",
      description:
        "Séance Solo dès 70 €, Duo 50 €/pers, cours collectifs dès 143 €/trimestre — Studio Pilates Chatou.",
      url: "https://www.atelier-pile-attitude.fr/tarifs",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Tarifs cours Pilates — Atelier Pile-Attitude, Chatou (78)" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Tarifs Pilates Machines & Tapis | Chatou (78) — À partir de 30 €",
      description: "Séance Solo 70 €, Duo 50 €/pers, Trio 40 €/pers. Cartes 5 ou 10 séances. Cours collectifs tapis dès 143 €/trimestre.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr/tarifs",
    },
  };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PrixRow {
  label: string;
  validite?: string;
  prix: string;
}

interface FormuleMachine {
  formule: string;
  rows: PrixRow[];
}

interface CollectifSection {
  professeure: string;
  lieu: string;
  creneaux: string[];
  tarifs: PrixRow[];
}

// ─── Données fallback ─────────────────────────────────────────────────────────

const DECOUVERTE = { duree: "30 mn", prix: "30 € / pers" };

const MACHINES_FALLBACK: FormuleMachine[] = [
  {
    formule: "Solo",
    rows: [
      { label: "Séance à l'unité", prix: "70 €" },
      { label: "Carte 5 séances", validite: "2 mois", prix: "340 €" },
      { label: "Carte 10 séances", validite: "4 mois", prix: "680 €" },
    ],
  },
  {
    formule: "Duo",
    rows: [
      { label: "Séance à l'unité", prix: "50 €/pers" },
      { label: "Carte 5 séances", validite: "2 mois", prix: "240 €/pers" },
      { label: "Carte 10 séances", validite: "4 mois", prix: "480 €/pers" },
    ],
  },
  {
    formule: "Trio et +",
    rows: [
      { label: "Séance à l'unité", prix: "40 €/pers" },
      { label: "Carte 5 séances", validite: "2 mois", prix: "190 €/pers" },
      { label: "Carte 10 séances", validite: "4 mois", prix: "380 €/pers" },
    ],
  },
];

const COLLECTIFS_FALLBACK: CollectifSection[] = [
  {
    professeure: "Sophie",
    lieu: "Centre Coroze, Chatou",
    creneaux: ["Mardi 9h (1h)", "Mardi 10h (1h)", "Jeudi 19h (1h)"],
    tarifs: [
      { label: "1 cours / semaine", prix: "220 €/trim." },
      { label: "2 cours / semaine", prix: "370 €/trim." },
    ],
  },
  {
    professeure: "Elise",
    lieu: "Natformgym, Croissy-sur-Seine",
    creneaux: ["Lundi 17h30 (1h)", "Lundi 18h30 (1h)", "Vendredi 12h15 (1h)", "Vendredi 13h15 (45 mn)"],
    tarifs: [
      { label: "1 cours d'1h / semaine", prix: "176 €/trim." },
      { label: "1 cours 45 mn / semaine", prix: "143 €/trim." },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatPrice(value: number | undefined, perPerson: boolean): string {
  if (value === undefined) return "—";
  return perPerson ? `${value} €/pers` : `${value} €`;
}

function buildMachineGroups(tarifs: Tarif[]): FormuleMachine[] {
  return tarifs.map((t) => {
    const rows: PrixRow[] = [];
    if (t.seanceUnite !== undefined)
      rows.push({ label: "Séance à l'unité", prix: formatPrice(t.seanceUnite, t.noteParPersonne ?? false) });
    if (t.carte5 !== undefined)
      rows.push({ label: "Carte 5 séances", validite: t.carte5Validite, prix: formatPrice(t.carte5, t.noteParPersonne ?? false) });
    if (t.carte10 !== undefined)
      rows.push({ label: "Carte 10 séances", validite: t.carte10Validite, prix: formatPrice(t.carte10, t.noteParPersonne ?? false) });
    return { formule: t.formule ?? "", rows };
  });
}

// ─── Composants ───────────────────────────────────────────────────────────────

function PrixLigne({ label, validite, prix }: PrixRow) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-black/8 last:border-0">
      <div>
        <span className="font-inter text-[14px] text-pile-muted">{label}</span>
        {validite && (
          <span className="block font-inter text-[11px] text-pile-muted/50 mt-0.5">
            Validité {validite}
          </span>
        )}
      </div>
      <span className="font-cormorant italic text-[30px] text-pile-dark leading-none ml-6 whitespace-nowrap">
        {prix}
      </span>
    </div>
  );
}

function ColonneFormule({ formule, rows }: FormuleMachine) {
  return (
    <div className="relative flex flex-col py-8 px-8 border border-black/8 hover:border-black/18 transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] hover:-translate-y-0.5">

      {/* Titre formule */}
      <p className="font-inter text-[15px] uppercase tracking-[0.12em] text-pile-dark mb-6">
        {formule}{" "}
        <span className="text-[13px] text-pile-muted normal-case tracking-normal font-normal">
          · 50 mn
        </span>
      </p>

      {/* Lignes de prix */}
      <div className="flex-1">
        {rows.map((row) => (
          <PrixLigne key={row.label} {...row} />
        ))}
      </div>

      {/* CTA */}
      <a
        href="/contact"
        className="mt-8 block text-center font-inter text-[11px] uppercase tracking-[0.15em] border border-pile-dark px-4 py-3.5 transition-all duration-200 hover:bg-pile-violet hover:text-white hover:border-pile-violet rounded-[2px]"
      >
        Réserver ma séance
      </a>
    </div>
  );
}

function CollectifBloc({ professeure, lieu, creneaux, tarifs }: CollectifSection) {
  return (
    <div className="flex flex-col">
      <p className="font-cormorant italic text-[40px] leading-[0.95] tracking-[-0.02em] text-pile-dark mb-1">
        {professeure}
      </p>

      {lieu && (
        <div className="flex items-center gap-1.5 mb-6">
          <MapPin size={12} className="text-pile-violet flex-shrink-0" />
          <p className="font-inter text-[13px] text-pile-muted">{lieu}</p>
        </div>
      )}

      {/* Badges créneaux — style pill moderne */}
      <div className="flex flex-wrap gap-2 mb-8 min-h-[72px] content-start">
        {creneaux.map((c) => (
          <span
            key={c}
            className="font-inter text-[11px] uppercase tracking-[0.08em] bg-black/[0.05] px-3 py-1.5 rounded-full text-pile-dark"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Tarifs */}
      <div className="border-t border-black/10 flex-1">
        {tarifs.map((t) => (
          <PrixLigne key={t.label} {...t} />
        ))}
      </div>

      {/* CTA */}
      <a
        href="/contact"
        className="mt-8 inline-block self-start font-inter text-[11px] uppercase tracking-[0.15em] border border-pile-dark px-6 py-3 transition-all duration-200 hover:bg-pile-violet hover:text-white hover:border-pile-violet rounded-[2px]"
      >
        Réserver ma séance
      </a>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function TarifsPage() {
  const tarifsData = await getTarifs();

  const tarifsMachines = tarifsData.filter((t) => t.categorie === "Cours Machines");
  const tarifsCollectifs = tarifsData.filter((t) => t.categorie === "Cours Collectifs Tapis");

  const machineGroups =
    tarifsMachines.length > 0 ? buildMachineGroups(tarifsMachines) : MACHINES_FALLBACK;

  const machineGroupsMain = machineGroups.filter(
    (g) => !g.formule.toLowerCase().includes("découverte")
  );

  const collectifSections: CollectifSection[] =
    tarifsCollectifs.length > 0
      ? tarifsCollectifs.map((t) => ({
          professeure: t.formule ?? "",
          lieu: "",
          creneaux: [],
          tarifs: [
            ...(t.seanceUnite !== undefined
              ? [{ label: "Séance à l'unité", prix: formatPrice(t.seanceUnite, t.noteParPersonne ?? false) }]
              : []),
            ...(t.carte5 !== undefined
              ? [{ label: "Carte 5 séances", validite: t.carte5Validite, prix: formatPrice(t.carte5, t.noteParPersonne ?? false) }]
              : []),
          ],
        }))
      : COLLECTIFS_FALLBACK;

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "Tarifs", href: "/tarifs" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Peut-on annuler une séance de Pilates ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "La séance sera facturée si elle est annulée la veille ou le jour même. Merci de nous prévenir le plus tôt possible par téléphone ou e-mail afin que nous puissions proposer le créneau à quelqu'un d'autre.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle est la validité des cartes de séances Pilates ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Les cartes 5 séances sont valables 2 mois à compter de la date d'achat. Les cartes 10 séances sont valables 4 mois. Les cartes ne sont ni échangeables ni remboursables.",
                },
              },
              {
                "@type": "Question",
                name: "Quelle tenue prévoir pour les séances de Pilates ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Une tenue de sport confortable (legging, t-shirt). Des chaussettes antidérapantes sont recommandées, vous pouvez également pratiquer pieds nus. Pas de chaussures de sport à l'intérieur du studio.",
                },
              },
              {
                "@type": "Question",
                name: "Le Pilates est-il adapté aux débutants ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolument. Toutes nos séances sont adaptées à votre niveau, que vous soyez débutant ou pratiquant confirmé. La séance découverte de 30 mn à 30 € est idéale pour une première approche de la méthode.",
                },
              },
              {
                "@type": "Question",
                name: "Les cours Pilates sur machines peuvent-ils se pratiquer à plusieurs ?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Oui, les cours machines se pratiquent en solo (70 €), en duo (50 €/pers) ou en trio et plus (40 €/pers). Chaque formule permet un accompagnement personnalisé. Vous pouvez venir entre amis ou en couple.",
                },
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Prestations Pilates — L'Atelier Pile-Attitude",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Service",
                  "name": "Séance Pilates Solo (50 mn)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "70", "priceCurrency": "EUR" },
                },
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Service",
                  "name": "Séance Pilates Duo (50 mn)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "50", "priceCurrency": "EUR", "description": "Par personne" },
                },
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Service",
                  "name": "Séance Pilates Trio et + (50 mn)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "40", "priceCurrency": "EUR", "description": "Par personne" },
                },
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Service",
                  "name": "Séance découverte Pilates (30 mn)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "30", "priceCurrency": "EUR" },
                },
              },
              {
                "@type": "ListItem",
                "position": 5,
                "item": {
                  "@type": "Service",
                  "name": "Cours collectif Pilates Tapis — Sophie (trimestre)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "220", "priceCurrency": "EUR", "description": "1 cours/semaine par trimestre" },
                },
              },
              {
                "@type": "ListItem",
                "position": 6,
                "item": {
                  "@type": "Service",
                  "name": "Cours collectif Pilates Tapis — Elise (trimestre)",
                  "provider": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                  "offers": { "@type": "Offer", "price": "176", "priceCurrency": "EUR", "description": "1 cours d'1h/semaine par trimestre" },
                },
              },
            ],
          }),
        }}
      />

      {/* ── Header ─────────────────────────────────────── */}
      <section className="pt-40 pb-8 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
            Tarifs
          </p>
          <h1 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[64px] text-pile-dark">
            Nos formules
          </h1>
        </AnimatedSection>
      </section>

      {/* ── Séance découverte ──────────────────────────── */}
      <AnimatedSection delay={0.1}>
        <div className="border-y border-black/8 bg-pile-cream/50">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex flex-wrap items-baseline gap-4 sm:gap-6">
                <p className="font-inter text-[11px] uppercase tracking-[0.15em] text-pile-violet whitespace-nowrap">
                  Séance découverte
                </p>
                <p className="font-inter text-[14px] text-pile-muted">
                  {DECOUVERTE.duree} · première approche de la méthode Pilates
                </p>
              </div>
              <p className="font-cormorant italic text-[36px] text-pile-dark leading-none whitespace-nowrap">
                {DECOUVERTE.prix}
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ── Cours Machines ─────────────────────────────── */}
      <section className="pt-20 pb-16 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <div className="mb-12">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
                  Cours sur machines
                </p>
                <h2 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[48px] text-pile-dark">
                  Pilates Machines
                </h2>
              </div>
              <div className="flex items-center gap-1.5 pb-2">
                <MapPin size={13} className="text-pile-violet flex-shrink-0" />
                <p className="font-inter text-[13px] text-pile-muted">
                  27 avenue de Brimont, Chatou
                </p>
              </div>
            </div>

            {/* Disponibilités professeurs */}
            <div className="flex flex-wrap gap-x-10 gap-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-inter text-[11px] uppercase tracking-[0.12em] text-pile-violet">
                  Sophie
                </span>
                <span className="font-inter text-[13px] text-pile-muted">
                  Mardi · Mercredi · Jeudi · Samedi
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="font-inter text-[11px] uppercase tracking-[0.12em] text-pile-violet">
                  Elise
                </span>
                <span className="font-inter text-[13px] text-pile-muted">
                  Lundi · Vendredi · Dimanche matin
                </span>
              </div>
            </div>
          </div>

          {/* Grille des formules — gap pour effet hover card individuel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {machineGroupsMain.map((groupe) => (
              <ColonneFormule
                key={groupe.formule}
                {...groupe}
              />
            ))}
          </div>

          <p className="font-inter text-[13px] text-pile-muted mt-6 italic">
            La séance sera facturée si elle est annulée la veille ou le jour même.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Cours Collectifs Tapis ─────────────────────── */}
      <section className="py-20 bg-pile-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection>
            <div className="mb-14">
              <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
                Cours collectifs tapis
              </p>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[48px] text-pile-dark">
                  Pilates Tapis
                </h2>
                <p className="font-inter text-[13px] text-pile-muted pb-2 max-w-xs text-right">
                  Ces cours sont dispensés dans des salles partenaires, aux adresses indiquées ci-dessous.
                </p>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {collectifSections.map((section, i) => (
              <AnimatedSection key={section.professeure} delay={i * 0.1}>
                <CollectifBloc {...section} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection>
          <div className="mb-12">
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
              Questions fréquentes
            </p>
            <h2 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[48px] text-pile-dark">
              FAQ
            </h2>
          </div>

          <FaqAccordion />
        </AnimatedSection>
      </section>

    </div>
  );
}
