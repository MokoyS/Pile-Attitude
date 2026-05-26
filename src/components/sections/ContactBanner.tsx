import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import type { SiteSettings } from "@/types/sanity.types";

interface ContactBannerProps {
  settings: SiteSettings | null;
}

export function ContactBanner({ settings }: ContactBannerProps) {
  const tel = settings?.telephone ?? "+33 6 20 55 29 30";
  const email = settings?.email ?? "contact@atelierpileattitude.fr";
  const adresse = settings?.adresse ?? "27 avenue de Brimont, Chatou 78400";
  const instagram = settings?.instagram;

  return (
    <section className="bg-pile-dark py-20 px-6">
      <div className="max-w-6xl mx-auto md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Adresse */}
          <div>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/40 mb-4">
              Adresse
            </p>
            <div className="flex items-start gap-3 text-white/80">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-pile-green" />
              <span className="font-inter text-[15px] leading-relaxed">{adresse}</span>
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
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Phone size={14} className="text-pile-green" />
                <span className="font-inter text-[15px]">{tel}</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Mail size={14} className="text-pile-green" />
                <span className="font-inter text-[15px]">{email}</span>
              </a>
            </div>
          </div>

          {/* Réseaux */}
          <div>
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-white/40 mb-4">
              Réseaux
            </p>
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
              >
                <Instagram size={14} className="text-pile-green" />
                <span className="font-inter text-[15px]">Instagram</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
