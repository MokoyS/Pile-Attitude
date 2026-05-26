import Image from "next/image";
import { getSiteSettings } from "@/lib/sanity/queries";
import { Phone, Mail, MapPin } from "lucide-react";

export async function Footer() {
  const settings = await getSiteSettings();

  const tel = settings?.telephone ?? "+33 6 20 55 29 30";
  const email = settings?.email ?? "atelierpileattitude@gmail.com";
  const adresse = settings?.adresse ?? "27 avenue de Brimont, Chatou 78400";

  return (
    <footer className="bg-pile-dark border-t border-pile-violet/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">

        {/* ── Logos certifications ─────────────────────── */}
        <div className="mb-12 pb-10 border-b border-white/10">
          {/* Mobile : grille 2×2 */}
          <div className="grid grid-cols-2 gap-6 md:hidden">
            <div className="flex items-center justify-center opacity-90">
              <Image
                src="/images/FPMP-BlackOrange-Logo-small.png"
                alt="Logo FPMP — Fédération des Professionnels de la Méthode Pilates"
                width={80}
                height={40}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="flex items-center justify-center opacity-90">
              <Image
                src="/images/PolestarPilatesLogo-1.png"
                alt="Logo Polestar Pilates — École internationale de formation"
                width={100}
                height={40}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded px-2 py-1 bg-white/90">
                <Image
                  src="/images/insitutcurie.png"
                  alt="Logo Institut Curie — partenaire médical"
                  width={90}
                  height={36}
                  className="object-contain"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="rounded px-2 py-1 bg-white/90">
                <Image
                  src="/images/Logo-Clinique-Saint-Jean-de-Dieu.png"
                  alt="Logo Clinique Saint Jean de Dieu — partenaire médical"
                  width={90}
                  height={36}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Desktop : ligne horizontale avec séparateurs */}
          <div className="hidden md:flex items-center justify-center gap-8">
            <div className="opacity-90">
              <Image
                src="/images/FPMP-BlackOrange-Logo-small.png"
                alt="Logo FPMP — Fédération des Professionnels de la Méthode Pilates, certification des professeures de l'Atelier Pile-Attitude"
                width={96}
                height={48}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="w-px h-8 bg-white/20 flex-shrink-0" />
            <div className="opacity-90">
              <Image
                src="/images/PolestarPilatesLogo-1.png"
                alt="Logo Polestar Pilates — École internationale de formation certifiant les professeures de l'Atelier Pile-Attitude"
                width={120}
                height={48}
                className="object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            </div>
            <div className="w-px h-8 bg-white/20 flex-shrink-0" />
            <div className="rounded px-3 py-1.5 bg-white/90">
              <Image
                src="/images/insitutcurie.png"
                alt="Logo Institut Curie — partenaire médical de l'Atelier Pile-Attitude"
                width={110}
                height={44}
                className="object-contain"
              />
            </div>
            <div className="w-px h-8 bg-white/20 flex-shrink-0" />
            <div className="rounded px-3 py-1.5 bg-white/90">
              <Image
                src="/images/Logo-Clinique-Saint-Jean-de-Dieu.png"
                alt="Logo Clinique Saint Jean de Dieu — partenaire médical de l'Atelier Pile-Attitude"
                width={110}
                height={44}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* ── Colonnes contact ─────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">

          {/* Adresse */}
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/40 mb-4">
              Adresse
            </p>
            <div className="flex items-start gap-3 text-white/70">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-pile-green" />
              <span className="font-inter text-[14px] leading-relaxed">{adresse}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/40 mb-4">
              Contact
            </p>
            <div className="space-y-2">
              <a
                href={`tel:${tel.replace(/\s/g, "")}`}
                className="flex items-center gap-3 font-inter text-[14px] text-white/70 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-pile-green flex-shrink-0" />
                {tel}
              </a>
              <a
                href={`mailto:atelierpileattitude@gmail.com`}
                className="flex items-center gap-3 font-inter text-[14px] text-white/70 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-pile-green flex-shrink-0" />
                <span className="break-all">atelierpileattitude@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Réseaux */}
          <div>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/40 mb-4">
              Réseaux
            </p>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/sophieleblan?igsh=NW9xbTl0cG1zYzR4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-inter text-[14px] text-white/70 hover:text-white transition-colors"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pile-green flex-shrink-0" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                @sophieleblan
              </a>
              <a
                href="https://www.instagram.com/elise.renard.pilates?igsh=MTljaGJjanJzZHZ0Zw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-inter text-[14px] text-white/70 hover:text-white transition-colors"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="text-pile-green flex-shrink-0" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                @elise.renard.pilates
              </a>
            </div>
          </div>
        </div>

        {/* ── Copyright ────────────────────────────────── */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-white/10">
          <p className="font-inter text-[11px] text-white/30 text-center">
            © 2026 L&apos;Atelier Pile-Attitude
          </p>
        </div>
      </div>
    </footer>
  );
}
