import { defineField, defineType } from "sanity";

export default defineType({
  name: "tarif",
  title: "Tarifs",
  type: "document",
  fields: [
    defineField({
      name: "categorie",
      title: "Catégorie",
      type: "string",
      options: { list: ["Cours Machines", "Cours Collectifs Tapis"] },
    }),
    defineField({ name: "formule", title: "Formule", type: "string" }),
    defineField({ name: "seanceUnite", title: "Séance à l'unité (€)", type: "number" }),
    defineField({ name: "carte5", title: "Carte 5 séances (€)", type: "number" }),
    defineField({ name: "carte5Validite", title: "Validité carte 5", type: "string" }),
    defineField({ name: "carte10", title: "Carte 10 séances (€)", type: "number" }),
    defineField({ name: "carte10Validite", title: "Validité carte 10", type: "string" }),
    defineField({ name: "noteParPersonne", title: "Prix par personne ?", type: "boolean" }),
    defineField({ name: "ordre", title: "Ordre d'affichage", type: "number" }),
  ],
});
