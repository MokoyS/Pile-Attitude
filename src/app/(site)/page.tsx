import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Presentation } from "@/components/sections/Presentation";
import { HomeNavigation } from "@/components/sections/HomeNavigation";
import { getAccueilPage, getSiteSettings } from "@/lib/sanity/queries";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "Atelier Pile-Attitude | Studio de Pilates à Chatou (78)",
    description:
      settings?.seoDescription ??
      "Bienvenue à l'Atelier Pile-Attitude à Chatou. Cours de Pilates sur machines et tapis avec Sophie & Elise, certifiées Polestar Pilates. Améliorez posture et bien-être. Réservez !",
    openGraph: {
      title: "Atelier Pile-Attitude | Studio de Pilates à Chatou (78)",
      description:
        "Studio Pilates sur machines à Chatou (78), 5 min du RER A Chatou-Croissy. Cours Solo, Duo, Trio et collectifs tapis.",
      url: "https://www.atelier-pile-attitude.fr",
      locale: "fr_FR",
      type: "website",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "L'Atelier Pile-Attitude — Studio de Pilates sur machines à Chatou (78)",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Atelier Pile-Attitude | Studio de Pilates à Chatou (78)",
      description:
        "Cours Pilates sur machines à Chatou, 5 min du RER A. Formules Solo, Duo, Trio et collectifs tapis.",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: "https://www.atelier-pile-attitude.fr",
    },
  };
}

const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SportsActivityLocation", "LocalBusiness"],
      "@id": "https://www.atelier-pile-attitude.fr/#business",
      name: "L'Atelier Pile-Attitude",
      description:
        "Studio de Pilates sur machines à Chatou (78). Cours Solo, Duo, Trio sur machines (Reformer, Cadillac, Chair, Barrel) et cours collectifs au tapis avec des professeures certifiées Polestar Pilates.",
      url: "https://www.atelier-pile-attitude.fr",
      telephone: "+33953024528",
      email: "atelierpileattitude@gmail.com",
      image: "https://www.atelier-pile-attitude.fr/og-image.jpg",
      logo: "https://www.atelier-pile-attitude.fr/images/Logo_studio_Pile_Attitude_4.png",
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Cash, Chèque, Virement",
      address: {
        "@type": "PostalAddress",
        streetAddress: "27 avenue de Brimont",
        addressLocality: "Chatou",
        postalCode: "78400",
        addressCountry: "FR",
        addressRegion: "Île-de-France",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 48.8916,
        longitude: 2.1519,
      },
      hasMap: "https://maps.google.com/maps?q=27+avenue+de+Brimont,+Chatou+78400",
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "09:00", closes: "20:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "14:00" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "12:00" },
      ],
      sameAs: [
        "https://www.instagram.com/sophieleblan",
      ],
      sport: "Pilates",
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Reformer", value: true },
        { "@type": "LocationFeatureSpecification", name: "Cadillac", value: true },
        { "@type": "LocationFeatureSpecification", name: "Chair", value: true },
        { "@type": "LocationFeatureSpecification", name: "Barrel", value: true },
        { "@type": "LocationFeatureSpecification", name: "Vestiaire", value: true },
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.atelier-pile-attitude.fr/#website",
      url: "https://www.atelier-pile-attitude.fr",
      name: "L'Atelier Pile-Attitude",
      description: "Studio de Pilates sur machines à Chatou (78)",
      publisher: { "@id": "https://www.atelier-pile-attitude.fr/#business" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.atelier-pile-attitude.fr/?s={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default async function HomePage() {
  const accueilPage = await getAccueilPage();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
      />
      <Hero accueilPage={accueilPage} />
      <Presentation />
      <HomeNavigation />
    </>
  );
}
