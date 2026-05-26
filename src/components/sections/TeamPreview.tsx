import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { SanityImage } from "@/components/shared/SanityImage";
import { getProfesseures } from "@/lib/sanity/queries";

const FALLBACK_PROFESSEURES = [
  {
    _id: "fallback-sophie",
    nom: "Sophie Leblan",
    role: "Fondatrice & Professeure",
    joursPresence: "Mardi · Mercredi · Jeudi · Samedi",
    photo: null,
    bio: null,
    localImage: "/images/sophie.jpeg",
    instagram: "https://www.instagram.com/sophieleblan?igsh=NW9xbTl0cG1zYzR4",
  },
  {
    _id: "fallback-elise",
    nom: "Elise Renard",
    role: "Professeure",
    joursPresence: "Lundi · Vendredi · Dimanche matin",
    photo: null,
    bio: null,
    localImage: "/images/elise%201.jpeg",
    instagram: "https://www.instagram.com/elise.renard.pilates?igsh=MTljaGJjanJzZHZ0Zw%3D%3D",
  },
];

export async function TeamPreview() {
  const fetched = await getProfesseures();
  const professeures = fetched.length > 0 ? fetched : FALLBACK_PROFESSEURES;

  return (
    <section id="equipe" className="bg-white py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <AnimatedSection>
          <div className="mb-20">
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-4">
              Notre équipe
            </p>
            <h2 className="font-cormorant italic text-[64px] leading-[0.95] tracking-[-0.02em] text-pile-dark">
              Sophie &amp; Elise
            </h2>
          </div>
        </AnimatedSection>

        {/* Cards */}
        <div className="space-y-0">
          {professeures.map((professeure, index) => {
            const isEven = index % 2 === 0;

            return (
              <AnimatedSection key={professeure._id} delay={index * 0.15}>
                <div className={isEven ? "bg-white" : "bg-pile-cream"}>
                  <div
                    className={`grid grid-cols-12 gap-0 ${
                      isEven ? "" : "direction-rtl"
                    }`}
                  >
                    {/* Image */}
                    <div
                      className={`col-span-5 h-[500px] relative overflow-hidden group ${
                        isEven ? "order-1" : "order-2"
                      }`}
                    >
                      {"photo" in professeure && professeure.photo ? (
                        <SanityImage
                          image={professeure.photo as NonNullable<typeof professeure.photo>}
                          alt={
                            (professeure.photo as { alt?: string }).alt ??
                            professeure.nom
                          }
                          fill
                          width={600}
                          height={500}
                          className="object-cover group-hover:scale-[1.05] transition-transform duration-[600ms]"
                          sizes="(max-width: 768px) 100vw, 42vw"
                        />
                      ) : (
                        <Image
                          src={
                            "localImage" in professeure && professeure.localImage
                              ? professeure.localImage
                              : professeure.nom?.toLowerCase().includes("sophie")
                              ? "/images/sophie.jpeg"
                              : "/images/elise%201.jpeg"
                          }
                          alt={
                            professeure.nom.toLowerCase().includes("sophie")
                              ? "Sophie Leblan, fondatrice et professeure certifiée Polestar Pilates à l'Atelier Pile-Attitude, Chatou (78)"
                              : "Elise Renard, professeure certifiée Polestar Pilates et FPMP à Chatou et Croissy-sur-Seine"
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, 42vw"
                          className="object-cover object-top group-hover:scale-[1.05] transition-transform duration-[600ms]"
                        />
                      )}
                    </div>

                    {/* Texte */}
                    <div
                      className={`col-span-7 flex flex-col justify-center ${
                        isEven ? "order-2 pl-16" : "order-1 pr-16"
                      }`}
                    >
                      {professeure.role && (
                        <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-6">
                          {professeure.role}
                        </p>
                      )}

                      <h3 className="font-cormorant italic text-[48px] leading-[0.95] tracking-[-0.02em] text-pile-dark mb-6">
                        {professeure.nom}
                      </h3>

                      {"bio" in professeure && professeure.bio && (
                        <p className="font-inter text-[17px] text-pile-muted leading-relaxed mb-8 max-w-md">
                          {/* Bio rendered as plain text if not PortableText */}
                          {Array.isArray(professeure.bio)
                            ? (professeure.bio as Array<{ children?: Array<{ text?: string }> }>)
                                .map((block) =>
                                  block.children
                                    ?.map((child) => child.text ?? "")
                                    .join("") ?? ""
                                )
                                .join(" ")
                            : String(professeure.bio)}
                        </p>
                      )}

                      {professeure.joursPresence && (
                        <div className="flex flex-wrap gap-2">
                          {professeure.joursPresence
                            .split(/[·,]+/)
                            .map((jour) => jour.trim())
                            .filter(Boolean)
                            .map((jour) => (
                              <span
                                key={jour}
                                className="inline-flex bg-pile-green text-white font-inter text-[11px] uppercase tracking-[0.1em] px-3 py-1"
                              >
                                {jour}
                              </span>
                            ))}
                        </div>
                      )}
                      {"instagram" in professeure && professeure.instagram && (
                        <a
                          href={professeure.instagram as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-flex items-center gap-2 font-inter text-[12px] text-pile-muted hover:text-pile-dark transition-colors"
                        >
                          <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                          Instagram
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* CTA */}
        <AnimatedSection delay={0.3}>
          <div className="mt-16">
            <Link
              href="/equipe"
              className="font-inter text-[13px] uppercase tracking-[0.15em] text-pile-dark border-b border-pile-dark pb-0.5 hover:text-pile-muted hover:border-pile-muted transition-colors duration-300"
            >
              Rencontrer l&apos;équipe →
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
