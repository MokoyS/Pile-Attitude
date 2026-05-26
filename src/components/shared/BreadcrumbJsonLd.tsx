const BASE_URL = "https://www.atelier-pile-attitude.fr";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const itemListElement = [
    { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
    ...items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 2,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement,
        }),
      }}
    />
  );
}
