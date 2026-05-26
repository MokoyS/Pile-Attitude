"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SESSION_KEY = "pile_toast_seen";
const DELAY_MS    = 8_000;

export function ReassuranceToast() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function close() {
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.45, ease: [0.25, 0, 0, 1] }}
          className={[
            "fixed z-[9990] pointer-events-auto",
            /* Mobile : centré en bas, 90% de largeur */
            "bottom-4 left-[5%] right-[5%]",
            /* Desktop : ancré en bas à droite, largeur fixe */
            "md:left-auto md:right-5 md:bottom-5 md:w-[300px]",
          ].join(" ")}
          role="dialog"
          aria-label="Popup de contact — L'Atelier Pile-Attitude"
        >
          <div
            className="relative bg-white rounded-[10px] px-6 py-6"
            style={{
              boxShadow: "0 8px 40px rgba(0,0,0,0.10), 0 1px 6px rgba(0,0,0,0.06)",
              border: "1.5px solid #5f3b61",
            }}
          >
            {/* Bouton fermer */}
            <button
              onClick={close}
              className="absolute top-3.5 right-3.5 text-pile-dark/30 hover:text-pile-dark transition-colors duration-200 p-1"
              aria-label="Fermer"
            >
              <svg width={12} height={12} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>

            {/* Titre */}
            <p className="font-cormorant italic text-[23px] leading-[1.1] tracking-[-0.01em] text-pile-dark mb-3 pr-6">
              Prendre rendez-vous ?
            </p>

            {/* Corps */}
            <p className="font-inter text-[13px] leading-[1.7] text-pile-muted mb-5">
              Réservez votre séance et commencez votre parcours bien-être dès aujourd&apos;hui.
            </p>

            {/* CTA */}
            <Link
              href="/contact"
              onClick={close}
              className="link-underline font-inter text-[11px] uppercase tracking-[0.18em] text-pile-violet hover:text-pile-dark transition-colors duration-200"
            >
              Prendre contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
