import { defineField, defineType } from "sanity";

export default defineType({
  name: "stats",
  title: "Stats",
  type: "document",
  fields: [
    defineField({
      name: "pageViews",
      title: "Page Views",
      type: "number",
      description: "Total de personas que vieron el portfolio",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "yearsExperience",
      title: "Years of Experience",
      type: "number",
      description: "Años de experiencia",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "projectsShipped",
      title: "Projects Shipped",
      type: "number",
      description: "Proyectos entregados",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
    defineField({
      name: "happyClients",
      title: "Happy Clients",
      type: "number",
      description: "Clientes felices",
      validation: (Rule) => Rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      pageViews: "pageViews",
      yearsExperience: "yearsExperience",
      projectsShipped: "projectsShipped",
      happyClients: "happyClients",
    },
    prepare({ pageViews, yearsExperience, projectsShipped, happyClients }) {
      return {
        title: "Portfolio Stats",
        subtitle: `${pageViews || 0} views • ${yearsExperience || 0} years • ${projectsShipped || 0} projects • ${happyClients || 0} clients`,
      };
    },
  },
});



