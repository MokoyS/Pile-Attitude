"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const startTimeRef = useRef<number>(Date.now());

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      nom: (form.elements.namedItem("nom") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      telephone: (form.elements.namedItem("telephone") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
      website: (form.elements.namedItem("website") as HTMLInputElement).value,
      _t: startTimeRef.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Une erreur est survenue.");
        setStatus("error");
      } else {
        setStatus("success");
        form.reset();
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion.");
      setStatus("error");
    }
  }

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
          <div className="grid lg:grid-cols-5 border-t border-black/10 lg:divide-x lg:divide-black/10">

            {/* Formulaire */}
            <motion.div
              className="lg:col-span-3 pt-10 lg:pr-16"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="py-12"
                  >
                    <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-4">
                      Message envoyé
                    </p>
                    <p className="font-cormorant italic text-[40px] lg:text-[48px] leading-[1.1] text-pile-dark mb-6">
                      Merci pour votre message.
                    </p>
                    <p className="font-inter text-[17px] leading-[1.7] text-pile-muted mb-10">
                      Sophie ou Elise vous répondront dans les plus brefs délais.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); startTimeRef.current = Date.now(); }}
                      className="font-inter uppercase tracking-[0.12em] text-[11px] text-pile-dark border-b border-pile-dark pb-0.5 hover:text-pile-violet hover:border-pile-violet transition-colors"
                    >
                      Envoyer un autre message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-8"
                    noValidate
                  >
                    {/* Honeypot anti-spam */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      className="hidden"
                      aria-hidden="true"
                    />

                    <div className="grid sm:grid-cols-2 gap-8">
                      <Field label="Nom & Prénom" name="nom" type="text" required />
                      <Field label="Email" name="email" type="email" required />
                    </div>

                    <Field label="Téléphone (optionnel)" name="telephone" type="tel" />

                    <div className="flex flex-col gap-2">
                      <label htmlFor="message" className="font-inter uppercase tracking-[0.12em] text-[11px] text-pile-violet">
                        Message <span className="text-pile-dark">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full border-b border-black/20 bg-transparent font-inter text-[15px] text-pile-dark placeholder:text-pile-muted/50 py-3 resize-none focus:outline-none focus:border-pile-dark transition-colors"
                        placeholder="Votre message..."
                      />
                    </div>

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="font-inter text-[13px] text-red-600"
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="bg-pile-dark text-white font-inter uppercase tracking-[0.12em] text-[11px] px-10 py-4 rounded-[2px] hover:bg-pile-violet transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? "Envoi en cours…" : "Envoyer le message"}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
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
                <div className="border-t border-black/10 py-6">
                  <p className="font-inter uppercase tracking-[0.15em] text-[11px] text-pile-violet mb-2">
                    Accès
                  </p>
                  <p className="font-inter text-[15px] text-pile-dark leading-[1.7]">
                    À 5 min à pied du RER A<br />Chatou-Croissy
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="font-inter uppercase tracking-[0.12em] text-[11px] text-pile-violet">
        {label} {required && <span className="text-pile-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full border-b border-black/20 bg-transparent font-inter text-[15px] text-pile-dark placeholder:text-pile-muted/50 py-3 focus:outline-none focus:border-pile-dark transition-colors"
        placeholder={type === "email" ? "votre@email.com" : type === "tel" ? "+33 6 00 00 00 00" : ""}
      />
    </div>
  );
}
