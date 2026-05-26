"use client";
import { motion } from "framer-motion";
import { SanityImage } from "@/components/shared/SanityImage";
import Link from "next/link";
import Image from "next/image";
import type { AccueilPage } from "@/types/sanity.types";

interface HeroProps {
  accueilPage: AccueilPage | null;
}

const LINES = ["Un moment pour soi", "S\u2019entretenir", "Bouger autrement"];

export function Hero({ accueilPage }: HeroProps) {
  const hasImage = !!accueilPage?.heroImage;

  return (
    <section
      className="relative overflow-hidden"
      style={{ marginTop: "56px", height: "calc(100svh - 56px)" }}
    >
      {/* ── Image Ken Burns ── */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: 1.07 }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{ scale: 1 }}
      >
        {hasImage ? (
          <SanityImage
            image={accueilPage!.heroImage!}
            alt="Studio de Pilates Atelier Pile-Attitude Chatou"
            width={1920}
            height={1080}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        ) : (
          <Image
            src="/images/studio%203.jpeg"
            alt="Studio de Pilates Atelier Pile-Attitude Chatou — salle d'entraînement"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
      </motion.div>

      {/* ── Overlay gradient — plus sombre en bas pour lisibilité ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/42 to-black/68" />

      {/* ── Contenu sur hauteur viewport ── */}
      <div
        className="absolute inset-x-0 top-0 z-10 flex flex-col"
        style={{ height: "calc(100svh - 56px)" }}
      >
        {/* Label */}
        <div className="pt-20 text-center">
          <p className="font-cormorant italic font-medium text-white/80 tracking-[0.35em] text-[12px] uppercase">
            Atelier Pile&apos;Attitude &mdash; Chatou
          </p>
        </div>

        {/* Titre staggered */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h1
            className="font-cormorant italic leading-[1.08] tracking-[-0.01em] text-white mb-8"
            style={{ fontSize: "clamp(44px, 6.5vw, 88px)" }}
          >
            {LINES.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 + i * 0.28 }}
                style={{ textShadow: "0 2px 32px rgba(0,0,0,0.45)" }}
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Boutons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 1.45 }}
          className="flex items-center justify-center gap-6 flex-wrap pb-10 px-6"
        >
          {/* Bouton principal — fill au survol */}
          <Link
            href="/le-studio"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-white text-pile-dark px-9 py-4 rounded-[2px] font-inter text-[12px] uppercase tracking-[0.15em] transition-colors duration-300 hover:text-white"
          >
            <span
              className="absolute inset-0 bg-pile-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
              aria-hidden="true"
            />
            <span className="relative">Découvrir le studio</span>
          </Link>

          <Link
            href="/contact"
            className="font-inter text-[12px] uppercase tracking-[0.15em] text-white/75 border-b border-white/35 pb-0.5 hover:text-white hover:border-white transition-all duration-200"
          >
            Prendre contact →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
