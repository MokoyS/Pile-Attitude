"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "Peut-on annuler une séance ?",
    answer:
      "La séance sera facturée si elle est annulée la veille ou le jour même. Merci de nous prévenir le plus tôt possible par téléphone ou e-mail afin que nous puissions proposer le créneau à quelqu'un d'autre.",
  },
  {
    question: "Quelle est la validité des cartes de séances ?",
    answer:
      "Les cartes 5 séances sont valables 2 mois à compter de la date d'achat. Les cartes 10 séances sont valables 4 mois. Les cartes ne sont ni échangeables ni remboursables.",
  },
  {
    question: "Quelle tenue prévoir pour les séances ?",
    answer:
      "Une tenue de sport confortable (legging, t-shirt). Des chaussettes antidérapantes sont recommandées, vous pouvez également pratiquer pieds nus. Pas de chaussures de sport à l'intérieur du studio.",
  },
  {
    question: "Le Pilates est-il adapté aux débutants ?",
    answer:
      "Absolument. Toutes nos séances sont adaptées à votre niveau, que vous soyez débutant ou pratiquant confirmé. La séance découverte de 30 mn est idéale pour une première approche de la méthode et faire connaissance avec le studio.",
  },
  {
    question: "Les cours sur machines peuvent-ils se pratiquer à plusieurs ?",
    answer:
      "Oui, les cours machines se pratiquent en solo, en duo ou en trio (et plus). Chaque formule permet un accompagnement personnalisé adapté à votre profil. Vous pouvez venir entre amis ou en couple.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-black/8">
      {FAQ_ITEMS.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between py-6 text-left group"
            aria-expanded={openIndex === index}
          >
            <span className="font-inter text-[15px] text-pile-dark group-hover:text-pile-violet transition-colors duration-200 pr-6">
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: openIndex === index ? 45 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex-shrink-0 text-pile-violet"
            >
              <Plus size={16} strokeWidth={1.5} />
            </motion.span>
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="font-inter text-[14px] text-pile-muted leading-[1.75] pb-6 max-w-2xl">
                  {item.answer}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
