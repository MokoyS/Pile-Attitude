import type { Metadata } from "next";
import { ContactForm } from "./ContactForm";
import { BreadcrumbJsonLd } from "@/components/shared/BreadcrumbJsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact | Studio Pilates L'Atelier Pile-Attitude Chatou",
    description:
      "Contactez l'Atelier Pile-Attitude à Chatou pour réserver votre cours de Pilates ou poser vos questions. Réponse rapide de Sophie ou Elise. À 5 min du RER A Chatou-Croissy.",
    openGraph: {
      title: "Contacter l'Atelier Pile-Attitude | Studio Pilates Chatou",
      description: "Écrivez-nous pour réserver une séance ou une séance découverte Pilates à Chatou (78).",
      url: "https://www.atelier-pile-attitude.fr/contact",
      locale: "fr_FR",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Contacter l'Atelier Pile-Attitude — Studio Pilates Chatou" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contacter l'Atelier Pile-Attitude | Studio Pilates Chatou",
      description: "Réservez votre séance de Pilates ou posez vos questions. Sophie & Elise vous répondent rapidement.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr/contact",
    },
  };
}

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Contact", href: "/contact" }]} />
      <ContactForm />
    </>
  );
}
