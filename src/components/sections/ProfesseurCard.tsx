"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { PortableText } from "@/components/shared/PortableText";
import type { Professeure } from "@/types/sanity.types";

export interface ProfesseurData {
  _id: string;
  nom: string;
  role: string;
  instagram: string;
  instagramHandle: string;
  ppImage: string;
  mainImage: string;
  bioText: string[];
  bio?: Professeure["bio"];
  photo?: Professeure["photo"];
}

export function ProfesseurCard({
  data,
  index,
}: {
  data: ProfesseurData;
  index: number;
}) {
  const imageLeft = index % 2 === 0;

  const hasSanityBio = data.bio && Array.isArray(data.bio) && data.bio.length > 0;
  const imageSrc = data.mainImage;

  const roleLabel = data.role.split(/\s*&\s*/)[0].trim().toUpperCase();
  const [firstName, ...rest] = data.nom.split(" ");
  const lastName = rest.join(" ");

  const sectionBg = index % 2 === 0 ? "bg-white" : "bg-[#f9f8f5]";

  return (
    <section className={sectionBg}>
      <div
        className={[
          "flex flex-col md:flex-row items-start",
          !imageLeft ? "md:flex-row-reverse" : "",
        ].join(" ")}
      >

        {/* ── Image sticky ── */}
        <div className={["w-full md:w-[45%] flex-shrink-0 md:sticky md:top-[72px]", sectionBg].join(" ")}>
          {/*
            pt-16 md:pt-32 : aligne le haut de l'image avec le label "FONDATRICE"
            md:h-[calc(100vh-72px)] : hauteur totale de la zone sticky (viewport - navbar)
            flex flex-col : permet à l'image de remplir l'espace restant après padding
          */}
          <div className="pt-16 md:pt-32 pb-8 md:pb-16 md:h-[calc(100vh-72px)] flex flex-col">
            <div className="relative flex-1 w-full min-h-[280px]">
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              >
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt={data.nom.toLowerCase().includes("sophie")
                        ? "Sophie Leblan, fondatrice de l'Atelier Pile-Attitude, professeure certifiée Polestar Pilates à Chatou (78)"
                        : "Elise Renard, professeure certifiée Polestar Pilates et FPMP, intervenante à Chatou et Croissy-sur-Seine"}
                    fill
                    className="object-contain object-top"
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority={index === 0}
                  />
                ) : null}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Panneau texte ── */}
        <div className="flex-1 px-8 md:px-16 lg:px-24 pt-16 md:pt-32 pb-8 md:pb-16 min-h-[100vh]">

          {/* Label rôle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="font-inter uppercase tracking-[0.22em] text-[10px] text-pile-violet mb-8"
          >
            {roleLabel}
          </motion.p>

          {/* Photo de profil + Nom */}
          <div className="flex items-end gap-5 md:gap-6 mb-10">
            {data.ppImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
                className="flex-shrink-0 relative rounded-full overflow-hidden ring-1 ring-black/10 w-[88px] h-[88px] md:w-[108px] md:h-[108px] lg:w-[116px] lg:h-[116px]"
              >
                <Image
                  src={data.ppImage}
                  alt={data.nom.toLowerCase().includes("sophie")
                      ? "Portrait de Sophie Leblan, fondatrice et professeure de Pilates à Chatou"
                      : "Portrait d'Elise Renard, professeure de Pilates à Chatou et Croissy-sur-Seine"}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 88px, (max-width: 1024px) 108px, 116px"
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
              className="flex flex-col justify-end"
            >
              <h2 className="font-cormorant italic leading-[0.88] tracking-[-0.03em] text-[64px] md:text-[80px] lg:text-[88px] text-pile-dark">
                {firstName}
              </h2>
              {lastName && (
                <p className="font-cormorant text-[28px] md:text-[36px] leading-[1.1] tracking-[-0.02em] text-pile-muted/60 font-light">
                  {lastName}
                </p>
              )}
            </motion.div>
          </div>

          {/* Séparateur */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            style={{ originX: 0 }}
            className="w-14 h-px bg-black/10 mb-12"
          />

          {/* Biographie */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.36 }}
            className="max-w-[480px] mb-12"
          >
            {hasSanityBio ? (
              <PortableText
                value={data.bio!}
                className="font-inter text-[15px] text-pile-muted leading-[1.7]"
              />
            ) : (
              <div className="space-y-5">
                {data.bioText.map((paragraph, i) => (
                  <p key={i} className="font-inter text-[15px] text-pile-muted leading-[1.7]">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </motion.div>

          {/* Instagram */}
          {data.instagram && (
            <motion.a
              href={data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.44 }}
              className="inline-flex items-center gap-2.5 font-inter text-[12px] text-pile-muted hover:text-pile-dark transition-colors duration-200"
            >
              <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
              {data.instagramHandle}
            </motion.a>
          )}

        </div>
      </div>
    </section>
  );
}
