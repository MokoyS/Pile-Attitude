import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/shared/ScrollProgress";
import { ReassuranceToast } from "@/components/shared/ReassuranceToast";

const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HealthAndBeautyBusiness", "ExerciseGym"],
  "@id": "https://www.atelier-pile-attitude.fr/#business",
  "name": "L'Atelier Pile-Attitude",
  "description": "Studio de Pilates sur machines à Chatou. Cours individuels et collectifs avec des professeures certifiées Polestar Pilates et reconnues FPMP.",
  "url": "https://www.atelier-pile-attitude.fr",
  "telephone": "+33620552930",
  "image": "https://www.atelier-pile-attitude.fr/images/Logo_studio_Pile_Attitude_4.png",
  "logo": "https://www.atelier-pile-attitude.fr/images/Logo_studio_Pile_Attitude_4.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "27 avenue de Brimont",
    "addressLocality": "Chatou",
    "postalCode": "78400",
    "addressRegion": "Île-de-France",
    "addressCountry": "FR",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 48.8862,
    "longitude": 2.1621,
  },
  "areaServed": [
    { "@type": "City", "name": "Chatou" },
    { "@type": "City", "name": "Le Vésinet" },
    { "@type": "City", "name": "Croissy-sur-Seine" },
    { "@type": "City", "name": "Montesson" },
    { "@type": "City", "name": "Carrières-sur-Seine" },
  ],
  "priceRange": "€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": "Cash, Carte bancaire",
  "sameAs": ["https://www.instagram.com/sophieleblan"],
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSONLD) }}
      />
      <ReassuranceToast />
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
