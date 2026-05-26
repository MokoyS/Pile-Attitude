import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/studio/", "/api/"],
      },
    ],
    sitemap: "https://www.atelier-pile-attitude.fr/sitemap.xml",
    host: "https://www.atelier-pile-attitude.fr",
  };
}
