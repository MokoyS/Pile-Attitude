"use client";

import { motion } from "framer-motion";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";

export function ContactForm() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <section className="min-h-screen pt-40 pb-32 px-6 md:px-12 lg:px-20 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* En-tête */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-16"
          >
            <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-4">
              Nous contacter
            </p>
            <h1 className="font-cormorant italic text-[56px] lg:text-[72px] leading-[0.95] tracking-[-0.02em] text-pile-dark">
              Écrire au studio
            </h1>
          </motion.div>

          {/* Grille */}
          <div className="grid lg:grid-cols-5 border-t border-black/10 divide-x-0 lg:divide-x lg:divide-black/10">

            {/* Formulaire */}
            <motion.div
              className="lg:col-span-3 pt-10 lg:pr-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              <div className="flex flex-col">
                <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-4">
                  Bientôt disponible
                </p>
                <p className="font-cormorant italic text-[40px] lg:text-[48px] leading-[1] text-pile-dark mb-6">
                  Le formulaire arrive prochainement.
                </p>
                <p className="font-inter text-[17px] leading-[1.7] text-pile-muted">
                  En attendant, contactez-nous directement par téléphone ou par email — nous vous répondrons avec plaisir.
                </p>
              </div>
            </motion.div>

            {/* Infos contact */}
            <motion.div
              className="lg:col-span-2 pt-10 lg:pl-16 border-t border-black/10 lg:border-t-0 mt-12 lg:mt-0"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <p className="font-inter text-[17px] leading-[1.7] text-pile-muted mb-10">
                Pour toute question sur nos cours, les tarifs ou pour réserver une séance découverte,
                n&apos;hésitez pas à nous écrire. Nous vous répondrons dans les plus brefs délais.
              </p>

              <div>
                <div className="border-t border-black/10 py-6">
                  <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-2">
                    Adresse
                  </p>
                  <p className="font-inter text-[15px] text-pile-dark">
                    27 avenue de Brimont<br />78400 Chatou
                  </p>
                </div>
                <div className="border-t border-black/10 py-6">
                  <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-2">
                    Téléphone
                  </p>
                  <a
                    href="tel:+33620552930"
                    className="font-inter text-[15px] text-pile-dark hover:text-pile-violet transition-colors"
                  >
                    +33 6 20 55 29 30
                  </a>
                </div>
                <div className="border-t border-black/10 py-6">
                  <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-2">
                    Email
                  </p>
                  <a
                    href="mailto:atelierpileattitude@gmail.com"
                    className="font-inter text-[15px] text-pile-dark hover:text-pile-violet transition-colors"
                  >
                    atelierpileattitude@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
