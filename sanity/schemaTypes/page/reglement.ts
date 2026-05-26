import { defineField, defineType } from "sanity";

export default defineType({
  name: "reglement",
  title: "Page Règlement",
  type: "document",
  fields: [
    defineField({ name: "contenu", title: "Contenu", type: "array", of: [{ type: "block" }] }),
  ],
});
