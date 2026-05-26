import { defineField, defineType } from "sanity";

export default defineType({
  name: "creneau",
  title: "Planning",
  type: "document",
  fields: [
    defineField({
      name: "professeure",
      title: "Professeure",
      type: "reference",
      to: [{ type: "professeure" }],
    }),
    defineField({
      name: "typeCours",
      title: "Type de cours",
      type: "string",
      options: { list: ["Machines", "Collectif Tapis"] },
    }),
    defineField({
      name: "jour",
      title: "Jour",
      type: "string",
      options: { list: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"] },
    }),
    defineField({ name: "heure", title: "Heure", type: "string" }),
    defineField({ name: "duree", title: "Durée", type: "string" }),
    defineField({ name: "lieu", title: "Lieu", type: "string" }),
    defineField({ name: "actif", title: "Afficher ce créneau", type: "boolean", initialValue: true }),
  ],
});
