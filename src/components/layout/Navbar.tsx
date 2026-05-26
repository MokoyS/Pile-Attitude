"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "L'Équipe", href: "/equipe" },
  { label: "Le Studio", href: "/le-studio" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "Règlement", href: "/reglement" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloquer le scroll body quand menu ouvert
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-black/5 will-change-transform">
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/Logo_studio_Pile_Attitude_4.png"
              alt="Logo L'Atelier Pile-Attitude — Studio de Pilates à Chatou (78)"
              width={44}
              height={44}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    link.href === "/contact"
                      ? `group relative overflow-hidden inline-flex items-center justify-center font-inter text-[11px] uppercase tracking-[0.15em] border border-pile-dark/40 px-4 py-1.5 rounded-[2px] transition-colors duration-300 hover:text-white hover:border-pile-violet ${isActive ? "text-pile-violet border-pile-violet" : "text-pile-dark/70"}`
                      : `link-underline font-inter text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${isActive ? "is-active text-pile-violet" : "text-pile-dark/60 hover:text-pile-dark"}`
                  }
                >
                  {link.href === "/contact" ? (
                    <>
                      <span className="absolute inset-0 bg-pile-violet translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" aria-hidden="true" />
                      <span className="relative">{link.label}</span>
                    </>
                  ) : link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden flex items-center justify-center text-pile-dark p-2 -mr-2"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col overflow-y-auto">
          {/* Barre top : logo + fermer */}
          <div className="flex items-center justify-between px-6 h-14 shrink-0 border-b border-black/5">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/images/Logo_studio_Pile_Attitude_4.png"
                alt="Logo L'Atelier Pile-Attitude"
                width={44}
                height={44}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center text-pile-dark p-2 -mr-2"
              aria-label="Fermer le menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Liens centrés */}
          <nav className="flex-1 flex flex-col items-center justify-center gap-5 py-10 px-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-cormorant italic text-[40px] sm:text-[48px] leading-none transition-colors ${
                    isActive ? "text-pile-violet" : "text-pile-dark hover:text-pile-violet"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
