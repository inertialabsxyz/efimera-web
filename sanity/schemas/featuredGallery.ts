// Featured Gallery schema for Sanity Studio
// A singleton document for managing the homepage featured gallery

export default {
  name: "featuredGallery",
  title: "Featured Gallery",
  type: "document",
  fields: [
    {
      name: "slides",
      title: "Gallery Slides",
      type: "array",
      of: [
        {
          type: "object",
          name: "imageSlide",
          title: "Image Slide",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
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
              name: "article",
              title: "Linked Article",
              type: "reference",
              to: [{ type: "article" }],
              description: "Optional: Link this slide to an article",
              hidden: ({ parent }) => !!parent?.url,
            },
            {
              name: "url",
              title: "External URL",
              type: "url",
              description:
                "Optional: Link this slide to an external URL (use instead of Linked Article)",
              validation: (Rule) =>
                Rule.uri({ scheme: ["http", "https"] }),
              hidden: ({ parent }) => !!parent?.article,
            },
            {
              name: "title",
              title: "Custom Title",
              type: "string",
              description: "Optional: Override the linked article title",
            },
            {
              name: "excerpt",
              title: "Custom Excerpt",
              type: "text",
              rows: 2,
              description: "Optional: Override the linked article excerpt",
            },
            {
              name: "displayWidth",
              title: "Display Width (px)",
              type: "number",
              description: "Optional: Set a custom display width in pixels",
            },
            {
              name: "displayHeight",
              title: "Display Height (px)",
              type: "number",
              description: "Optional: Set a custom display height in pixels",
            },
          ],
          preview: {
            select: {
              media: "image",
              title: "title",
              articleTitle: "article.title",
              url: "url",
            },
            prepare({ media, title, articleTitle, url }) {
              return {
                title: title || articleTitle || url || "Image Slide",
                subtitle: url ? "External Link" : "Image",
                media,
              };
            },
          },
        },
        {
          type: "object",
          name: "revistaSlide",
          title: "Revista Slide",
          fields: [
            {
              name: "revista",
              title: "Revista",
              type: "reference",
              to: [{ type: "revista" }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: "displayWidth",
              title: "Display Width (px)",
              type: "number",
              description: "Optional: Set a custom display width in pixels",
            },
            {
              name: "displayHeight",
              title: "Display Height (px)",
              type: "number",
              description: "Optional: Set a custom display height in pixels",
            },
          ],
          preview: {
            select: {
              title: "revista.title",
              media: "revista.coverImage",
            },
            prepare({ title, media }) {
              return {
                title: title || "Revista Slide",
                subtitle: "Revista PDF",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error("Add at least one slide"),
    },
    {
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Español", value: "es" },
          { title: "English", value: "en" },
        ],
      },
      initialValue: "es",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      slides: "slides",
      language: "language",
    },
    prepare({ slides, language }) {
      const count = slides?.length || 0;
      const lang = language === "en" ? " [EN]" : "";
      return {
        title: `Featured Gallery${lang}`,
        subtitle: `${count} slide${count !== 1 ? "s" : ""}`,
      };
    },
  },
};
