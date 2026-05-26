import { defineField, defineType } from "sanity";

export default defineType({
  name: "studio",
  title: "Page Le Studio",
  type: "document",
  fields: [
    defineField({ name: "titre", title: "Titre", type: "string" }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "photos", title: "Photos du studio", type: "array", of: [{ type: "image", options: { hotspot: true } }] }),
  ],
});
