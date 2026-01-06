import { defineField, defineType } from "sanity";

export default defineType({
  name: "pageViews",
  title: "Page Views",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      description: 'Ruta de la página (ej: "/", "/projects/proyecto-1")',
    }),
    defineField({
      name: "views",
      title: "Views",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "lastViewed",
      title: "Last Viewed",
      type: "datetime",
    }),
  ],
});
