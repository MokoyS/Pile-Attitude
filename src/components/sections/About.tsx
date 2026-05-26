import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import type { AccueilPage } from "@/types/sanity.types";

interface AboutProps {
  accueilPage: AccueilPage | null;
}

export function About({ accueilPage }: AboutProps) {
  return (
    <section className="relative py-40 px-6 overflow-hidden">
      {/* Image de fond */}
      <Image
        src="/images/studio%205.jpeg"
        alt="Studio Pilates Atelier Pile-Attitude"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Contenu */}
      <AnimatedSection className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/50 mb-8">
          Notre engagement
        </p>
        <blockquote
          className="font-cormorant italic leading-[1.2] text-white"
          style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
        >
          Le Pilates est bien plus qu&apos;une méthode d&apos;entraînement : c&apos;est un véritable outil pour se sentir mieux au quotidien, et améliorer ses performances dans ses activités sportives ou artistiques.
        </blockquote>
      </AnimatedSection>
    </section>
  );
}
