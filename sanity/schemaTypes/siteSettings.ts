import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  fields: [
    defineField({ name: "nom", title: "Nom du studio", type: "string" }),
    defineField({ name: "slogan", title: "Slogan", type: "string" }),
    defineField({ name: "telephone", title: "Téléphone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "adresse", title: "Adresse", type: "string" }),
    defineField({ name: "instagram", title: "Lien Instagram", type: "url" }),
    defineField({ name: "logoPolestar", title: "Logo Polestar", type: "image" }),
    defineField({ name: "logoFpmp", title: "Logo FPMP", type: "image" }),
    defineField({ name: "seoDescription", title: "Description SEO globale", type: "text" }),
  ],
});
