import type { MetadataRoute } from "next";

const BASE_URL = "https://www.atelier-pile-attitude.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/tarifs`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/equipe`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/le-studio`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/reglement`,
      lastModified: new Date("2026-05-27"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
