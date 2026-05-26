import Link from "next/link";
import Image from "next/image";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

export function HomeNavigation() {
  return (
    <>
      {/* ── L'Équipe ─────────────────────────────────────────── */}
      <section className="py-24 border-t border-black/8">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
            <div className="flex flex-col md:grid md:grid-cols-12 md:items-end gap-6 md:gap-0">
              <div className="md:col-span-8">
                <p className="font-inter text-[11px] uppercase tracking-[0.15em] text-pile-violet mb-5">
                  Notre équipe
                </p>
                <h2
                  className="font-cormorant italic leading-[0.92] tracking-[-0.02em] text-pile-dark"
                  style={{ fontSize: "clamp(44px, 6vw, 80px)" }}
                >
                  Sophie &amp; Elise
                </h2>
                <p className="font-inter text-[15px] md:text-[16px] text-pile-muted leading-relaxed mt-6 max-w-lg">
                  Professeures certifiées Polestar Pilates, reconnues par la FPMP. Passionnées et à l&apos;écoute, elles vous accompagnent à votre rythme.
                </p>
              </div>
              <div className="md:col-span-4 md:flex md:justify-end md:pb-2">
                <Link
                  href="/equipe"
                  className="font-inter text-[12px] uppercase tracking-[0.15em] text-pile-dark border-b border-pile-dark pb-0.5 hover:text-pile-violet hover:border-pile-violet transition-colors duration-300"
                >
                  Rencontrer l&apos;équipe →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Le Studio ────────────────────────────────────────── */}
      <section className="relative h-[420px] overflow-hidden">
        <Image
          src="/images/studio%206.jpeg"
          alt="Studio Pilates Atelier Pile-Attitude — Chatou"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/52" />
        <AnimatedSection className="absolute inset-0 flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 md:px-12 lg:px-20 pb-14">
            <div className="flex flex-col md:grid md:grid-cols-12 md:items-end gap-6 md:gap-0">
              <div className="md:col-span-8">
                <p className="font-inter text-[11px] uppercase tracking-[0.15em] text-white/40 mb-5">
                  Le studio
                </p>
                <h2
                  className="font-cormorant italic leading-[0.92] tracking-[-0.02em] text-white"
                  style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
                >
                  Un espace dédié
                  <br />
                  au bien-être
                </h2>
                <p className="font-inter text-[13px] text-white/40 mt-4 tracking-[0.08em]">
                  Reformer · Cadillac · Chair · Barrel · Spine Corrector
                </p>
              </div>
              <div className="md:col-span-4 md:flex md:justify-end md:pb-1">
                <Link
                  href="/le-studio"
                  className="font-inter text-[12px] uppercase tracking-[0.15em] text-white/60 border-b border-white/30 pb-0.5 hover:text-white hover:border-white transition-colors duration-300"
                >
                  Découvrir le studio →
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── Tarifs ───────────────────────────────────────────── */}
      <section className="py-32 bg-pile-cream">
        <AnimatedSection>
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 flex flex-col items-center text-center">

            <p className="font-inter text-[11px] uppercase tracking-[0.15em] text-pile-violet mb-5">
              Tarifs
            </p>

            <h2
              className="font-cormorant italic leading-[0.95] tracking-[-0.02em] text-pile-dark mb-10"
              style={{ fontSize: "clamp(48px, 5vw, 72px)" }}
            >
              Nos formules &amp; tarifs
            </h2>

            <p className="font-inter text-[15px] text-pile-muted leading-[1.7] tracking-[0.01em] max-w-[600px]">
              De la séance individuelle sur mesure aux cours collectifs, explorez toutes nos formules adaptées à vos besoins.
            </p>

            <div className="mt-12">
              <Link
                href="/tarifs"
                className="group relative inline-flex items-center justify-center font-inter text-[11px] uppercase tracking-[0.22em] text-pile-dark border border-pile-dark px-12 py-4 overflow-hidden transition-colors duration-300 hover:text-white hover:border-pile-violet rounded-[2px]"
              >
                <span
                  className="absolute inset-0 bg-pile-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"
                  aria-hidden="true"
                />
                <span className="relative">Consulter les tarifs</span>
              </Link>
            </div>

          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
