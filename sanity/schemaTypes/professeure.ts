import { defineField, defineType } from "sanity";

export default defineType({
  name: "professeure",
  title: "Professeures",
  type: "document",
  fields: [
    defineField({ name: "nom", title: "Nom complet", type: "string" }),
    defineField({ name: "role", title: "Rôle", type: "string" }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "bio", title: "Biographie", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "telephone", title: "Téléphone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "instagram", title: "Instagram", type: "url" }),
    defineField({ name: "joursPresence", title: "Jours de présence", type: "string" }),
    defineField({ name: "ordre", title: "Ordre d'affichage", type: "number" }),
  ],
});
