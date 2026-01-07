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
          name: "slide",
          title: "Slide",
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
            },
            prepare({ media, title, articleTitle }) {
              return {
                title: title || articleTitle || "Untitled slide",
                media,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).error("Add at least one slide"),
    },
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      const count = slides?.length || 0;
      return {
        title: "Featured Gallery",
        subtitle: `${count} slide${count !== 1 ? "s" : ""}`,
      };
    },
  },
};
