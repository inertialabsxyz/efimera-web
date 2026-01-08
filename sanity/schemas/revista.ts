// Revista PDF schema for Sanity Studio

export default {
  name: "revista",
  title: "Revista",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Front page/cover of the revista",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "pdf",
      title: "PDF File",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Optional brief description",
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverImage",
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Publish Date, New",
      name: "publishDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
};
