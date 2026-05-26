"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

const PHOTOS = [
  { src: "/images/studio%203.jpeg",                   alt: "Studio Pilates Atelier Pile-Attitude — vue d'ensemble, Chatou" },
  { src: "/images/studio%205.jpeg",                   alt: "Reformer Pilates — machine principale du studio Pile-Attitude Chatou" },
  { src: "/images/studio%206.jpeg",                   alt: "Vue d'ensemble du studio Pilates — Atelier Pile-Attitude, Chatou (78)" },
  { src: "/images/studio%208.jpeg",                   alt: "Espace Pilates sur machines — à 5 min du RER A Chatou-Croissy" },
  { src: "/images/studio%20salle%20attente%201.jpeg", alt: "Salle d'attente du studio Pilates L'Atelier Pile-Attitude, Chatou" },
];

const rowVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
} as const;

const rowTransition         = { duration: 0.55, ease: [0.25, 0, 0, 1] as const };
const rowTransitionDelayed  = { duration: 0.55, ease: [0.25, 0, 0, 1] as const, delay: 0.05 };

interface PhotoBtnProps {
  index: number;
  className?: string;
  sizes?: string;
  onClick: (i: number) => void;
}

function PhotoBtn({ index, className = "", sizes = "50vw", onClick }: PhotoBtnProps) {
  const photo = PHOTOS[index];
  return (
    <button
      onClick={() => onClick(index)}
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      aria-label={`Agrandir : ${photo.alt}`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        priority={index === 0}
        className="object-cover transition-all duration-[600ms] group-hover:scale-[1.03] group-hover:brightness-[1.06]"
        sizes={sizes}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={22} />
      </div>
    </button>
  );
}

export function StudioGallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev  = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length)), []);
  const next  = useCallback(() => setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length)), []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      close();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, prev, next]);

  return (
    <>
      <section className="py-6 md:py-8 max-w-6xl mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex flex-col gap-2">

          {/* ── Rangée 1 ────────────────────────────────────────────────────
              Mobile        : 3 images empilées pleine largeur
              Tablette (sm) : grande image + 2 petites côte à côte en dessous
              Desktop (lg)  : bento 8/12 grand + 4/12 deux images empilées      */}
          <motion.div
            className="flex flex-col lg:grid lg:grid-cols-12 gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={rowVariants}
            transition={rowTransition}
          >
            {/* Grande image principale */}
            <PhotoBtn
              index={0}
              className="w-full h-[220px] sm:h-[300px] lg:col-span-8 lg:h-[480px]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
              onClick={setLightboxIndex}
            />
            {/* 2 images — côte à côte sur mobile/tablette, empilées sur desktop */}
            <div className="grid grid-cols-2 lg:flex lg:flex-col gap-2 lg:col-span-4">
              <PhotoBtn
                index={1}
                className="h-[160px] sm:h-[200px] lg:flex-1 lg:h-[232px]"
                sizes="(max-width: 1024px) 50vw, 25vw"
                onClick={setLightboxIndex}
              />
              <PhotoBtn
                index={2}
                className="h-[160px] sm:h-[200px] lg:flex-1 lg:h-[232px]"
                sizes="(max-width: 1024px) 50vw, 25vw"
                onClick={setLightboxIndex}
              />
            </div>
          </motion.div>

          {/* ── Rangée 2 ────────────────────────────────────────────────────
              Mobile        : images empilées pleine largeur
              Tablette (sm) : 2 colonnes égales
              Desktop (lg)  : 2 colonnes légèrement asymétriques (7/12 · 5/12) */}
          <motion.div
            className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-12 gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={rowVariants}
            transition={rowTransitionDelayed}
          >
            <PhotoBtn
              index={3}
              className="h-[220px] sm:h-[280px] lg:col-span-7 lg:h-[340px]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
              onClick={setLightboxIndex}
            />
            <PhotoBtn
              index={4}
              className="h-[220px] sm:h-[280px] lg:col-span-5 lg:h-[340px]"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
              onClick={setLightboxIndex}
            />
          </motion.div>

        </div>
      </section>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/93 z-50 flex items-center justify-center"
          onClick={close}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PHOTOS[lightboxIndex].src}
              alt={PHOTOS[lightboxIndex].alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>

          <button
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-white/60 hover:text-white transition-colors p-2"
            aria-label="Fermer la galerie"
          >
            <X size={26} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Image précédente"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2"
            aria-label="Image suivante"
          >
            <ChevronRight size={32} />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-inter text-[11px] text-white/30 tracking-[0.15em] uppercase">
            {lightboxIndex + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </>
  );
}
