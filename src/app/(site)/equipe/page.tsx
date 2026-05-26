import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { PortableText } from "@/components/shared/PortableText";
import { ProfesseurCard } from "@/components/sections/ProfesseurCard";
import type { ProfesseurData } from "@/components/sections/ProfesseurCard";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";
import { getEquipePage, getProfesseures } from "@/lib/sanity/queries";
import type { Professeure } from "@/types/sanity.types";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sophie & Elise | Professeures Pilates Certifiées à Chatou",
    description:
      "Rencontrez Sophie Leblan et Elise Renard, professeures certifiées Polestar Pilates et reconnues FPMP. Un accompagnement expert, bienveillant et personnalisé à Chatou (78).",
    openGraph: {
      title: "Sophie & Elise | Professeures Pilates Certifiées à Chatou",
      description:
        "Sophie Leblan (fondatrice) et Elise Renard, professeures certifiées Polestar Pilates & FPMP à l'Atelier Pile-Attitude, Chatou.",
      url: "https://www.atelier-pile-attitude.fr/equipe",
      locale: "fr_FR",
      type: "profile",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Sophie & Elise — Professeures Pilates certifiées Polestar à Chatou" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Sophie & Elise | Professeures Pilates Certifiées Polestar — Chatou",
      description: "Fondatrice Sophie Leblan et Elise Renard, certifiées Polestar Pilates & FPMP. Accompagnement personnalisé à l'Atelier Pile-Attitude, Chatou.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr/equipe",
    },
  };
}

// ─── Données fallback ─────────────────────────────────────────────────────────

const INTRO_FALLBACK =
  "Au sein du studio, vous êtes accompagné par Sophie et Elise, toutes deux professeures certifiées en Pilates par l'école Polestar Pilates, une référence internationale reconnue pour la qualité et l'exigence de sa formation. Leur certification est également reconnue par la FPMP (Fédération des Professionnels de la Méthode Pilates). Passionnées et à l'écoute, elles mettent leurs compétences et leur expertise au service de votre progression, en vous proposant un accompagnement personnalisé, adapté à vos besoins et à vos objectifs.";

const FALLBACK_PROFESSEURES: ProfesseurData[] = [
  {
    _id: "sophie-fallback",
    nom: "Sophie Leblan",
    role: "Fondatrice · Professeure & certifiée Polestar Pilates — FPMP",
    instagram: "https://www.instagram.com/sophieleblan?igsh=NW9xbTl0cG1zYzR4",
    instagramHandle: "@sophieleblan",
    ppImage: "/images/PP%20Sophie%202.png",
    mainImage: "/images/sophie.jpeg",
    bioText: [
      "Née dans une famille de sportifs, je pratique de nombreux sports depuis l'enfance : natation en compétition, tennis, ski alpin et nautique, gymnastique aux agrès. Parallèlement, formée auprès de professeurs issus de la méthode Vaganova (Rosella Highthower, Stanlowa, Cité Véron, le Groupe international des Huit), la danse classique accompagne mes journées depuis l'âge de 4 ans.",
      "À 20 ans, je rencontre Catherine Karako, disciple de Lillian Arlen, qui me transmet un enseignement rare basé sur le placement, la respiration du yoga, tout en initiant des enfants à la danse classique.",
      "En 2017, je me forme à la méthode Pilates chez Polestar (Paris) en Mat, puis en 2019 en Comprehensive studio (Reformer, Cadillac, Chair, Barrel).",
      "En 2022, j'obtiens le diplôme d'Activité Physique et Sportive sur Prescription médicale, et en 2023 je me forme auprès de Corporis Fabrica® en biomécanique, optimisation du mouvement et prévention des blessures.",
      "Aujourd'hui, je mets toutes mes compétences à votre service.",
    ],
  },
  {
    _id: "elise-fallback",
    nom: "Elise Renard",
    role: "Professeure & certifiée Polestar Pilates — FPMP",
    instagram: "https://www.instagram.com/elise.renard.pilates?igsh=MTljaGJjanJzZHZ0Zw%3D%3D",
    instagramHandle: "@elise.renard.pilates",
    ppImage: "/images/PP%20Elise%202.png",
    mainImage: "/images/elise%201.jpeg",
    bioText: [
      "Après avoir passé 20 ans dans la Pub, la volonté de travailler dans un environnement qui fait davantage sens pour moi est une évidence.",
      "Ces dernières années ont été marquées par des dépassements sportifs qui m'ont amenée à effectuer des entraînements spécifiques. J'ai ainsi découvert les effets bénéfiques du Pilates. J'ai alors décidé de me former auprès de l'école Polestar International et de partager les bienfaits de cette méthode douce mais exigeante.",
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function EquipePage() {
  const [equipePage, professeures] = await Promise.all([
    getEquipePage(),
    getProfesseures(),
  ]);

  const displayedProfesseures: ProfesseurData[] =
    professeures.length > 0
      ? professeures.map((p: Professeure, i: number) => ({
          _id: p._id,
          nom: p.nom ?? "",
          role: p.role ?? "",
          instagram: (p.instagram as string) ?? "",
          instagramHandle: (() => {
            const match = ((p.instagram as string) ?? "").match(/instagram\.com\/([^/?]+)/);
            return match ? `@${match[1]}` : "@instagram";
          })(),
          ppImage: FALLBACK_PROFESSEURES[i]?.ppImage ?? "",
          mainImage: FALLBACK_PROFESSEURES[i]?.mainImage ?? "",
          bioText: [],
          bio: p.bio,
          photo: p.photo ?? undefined,
        }))
      : FALLBACK_PROFESSEURES;

  return (
    <div className="bg-white min-h-screen">
      <BreadcrumbJsonLd items={[{ name: "L'Équipe", href: "/equipe" }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": "https://www.atelier-pile-attitude.fr/#sophie",
                "name": "Sophie Leblan",
                "jobTitle": "Professeure de Pilates",
                "description": "Fondatrice de L'Atelier Pile-Attitude, certifiée Polestar Pilates (Mat & Comprehensive), titulaire du diplôme APS sur prescription médicale et formée en biomécanique Corporis Fabrica®.",
                "affiliation": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                "url": "https://www.atelier-pile-attitude.fr/equipe",
                "sameAs": ["https://www.instagram.com/sophieleblan"],
                "knowsAbout": ["Pilates sur machines", "Reformer", "Cadillac", "Biomécanique", "Prévention des blessures"],
              },
              {
                "@type": "Person",
                "@id": "https://www.atelier-pile-attitude.fr/#elise",
                "name": "Elise Renard",
                "jobTitle": "Professeure de Pilates",
                "description": "Professeure certifiée Polestar Pilates et FPMP, intervenante à L'Atelier Pile-Attitude et au Natformgym de Croissy-sur-Seine.",
                "affiliation": { "@id": "https://www.atelier-pile-attitude.fr/#business" },
                "url": "https://www.atelier-pile-attitude.fr/equipe",
                "sameAs": ["https://www.instagram.com/elise.renard.pilates"],
                "knowsAbout": ["Pilates au tapis", "Pilates Matwork", "Pilates sur machines"],
              },
            ],
          }),
        }}
      />

      {/* ── Header ─────────────────────────────────────── */}
      <section className="bg-pile-cream border-b border-black/[0.06]">
        <div className="pt-40 pb-24 max-w-5xl mx-auto px-6 md:px-12 lg:px-20">

          {/* Titre — pleine largeur */}
          <AnimatedSection>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-3">
              Notre équipe
            </p>
            <h1 className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-[64px] text-pile-dark mb-10">
              Sophie & Elise
            </h1>
          </AnimatedSection>

          {/* Ligne de séparation fine */}
          <div className="w-10 h-px bg-pile-violet/30 mb-10" />

          {/* Logo + Bio — côte à côte, parfaitement alignés */}
          <AnimatedSection delay={0.15}>
            <div className="flex items-stretch gap-6 md:gap-8">

              {/* Logo — largeur fixe, hauteur = hauteur du texte bio (self-stretch) */}
              <div className="hidden md:block flex-shrink-0 self-stretch relative" style={{ width: 220 }}>
                <Image
                  src="/images/Logo_studio_Pile_Attitude_4.png"
                  alt="Logo Atelier Pile-Attitude — studio Pilates Chatou"
                  fill
                  className="object-contain object-center"
                  sizes="220px"
                />
              </div>

              {/* Description */}
              <div className="flex-1 min-w-0">
                {equipePage?.introduction && equipePage.introduction.length > 0 ? (
                  <PortableText
                    value={equipePage.introduction}
                    className="font-inter text-[17px] text-pile-muted leading-[1.8]"
                  />
                ) : (
                  <p className="font-inter text-[17px] text-pile-muted leading-[1.8]">
                    {INTRO_FALLBACK}
                  </p>
                )}
              </div>

            </div>
          </AnimatedSection>

        </div>
      </section>

      {/* ── Sections split-screen en zigzag ────────────── */}
      <div>
        {displayedProfesseures.map((data, index) => (
          <ProfesseurCard key={data._id} data={data} index={index} />
        ))}
      </div>

      {/* ── Certifications — bannière élégante ─────────── */}
      <AnimatedSection>
        <section className="py-16 border-y border-black/8">
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
            <p className="font-inter uppercase tracking-[0.22em] text-[10px] text-pile-muted text-center mb-10">
              Certifications
            </p>
            <div className="flex items-center justify-center gap-14">

              {/* Polestar */}
              <div className="group flex items-center justify-center cursor-default">
                <Image
                  src="/images/PolestarPilatesLogo-1.png"
                  alt="Logo Polestar Pilates — certification internationale obtenue par Sophie Leblan et Elise Renard, professeures à l'Atelier Pile-Attitude Chatou"
                  width={140}
                  height={50}
                  className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ maxHeight: "46px", width: "auto" }}
                />
              </div>

              {/* Séparateur vertical */}
              <div className="w-px h-10 bg-black/12 flex-shrink-0" />

              {/* FPMP */}
              <div className="group flex items-center justify-center cursor-default">
                <Image
                  src="/images/FPMP-BlackOrange-Logo-small.png"
                  alt="Logo FPMP — Fédération des Professionnels de la Méthode Pilates, reconnaissance officielle des professeures de l'Atelier Pile-Attitude"
                  width={100}
                  height={50}
                  className="object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                  style={{ maxHeight: "46px", width: "auto" }}
                />
              </div>

            </div>
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}
