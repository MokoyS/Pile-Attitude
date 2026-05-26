import { defineField, defineType } from "sanity";

export default defineType({
  name: "accueil",
  title: "Page Accueil",
  type: "document",
  fields: [
    defineField({ name: "heroTitre", title: "Titre Hero", type: "string" }),
    defineField({ name: "heroSousTitre", title: "Sous-titre Hero", type: "string" }),
    defineField({ name: "heroImage", title: "Image Hero", type: "image", options: { hotspot: true } }),
    defineField({ name: "texteIntroduction", title: "Texte d'introduction", type: "array", of: [{ type: "block" }] }),
  ],
});
