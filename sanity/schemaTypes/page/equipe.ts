import { defineField, defineType } from "sanity";

export default defineType({
  name: "equipe",
  title: "Page L'Équipe",
  type: "document",
  fields: [
    defineField({ name: "introduction", title: "Texte d'introduction", type: "array", of: [{ type: "block" }] }),
  ],
});
