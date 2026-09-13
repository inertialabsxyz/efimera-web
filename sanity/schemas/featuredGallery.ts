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
      name: "hero",
      title: "Homepage Hero",
      type: "object",
      description:
        "Optional: the large featured block at the top of the homepage. Leave empty to hide it.",
      options: { collapsible: true, collapsed: true },
      fields: [
        {
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          description: 'Small label above the title, e.g. "Exposición"',
        },
        {
          name: "title",
          title: "Title",
          type: "string",
          description: "Large display headline",
        },
        {
          name: "subtitle",
          title: "Subtitle",
          type: "string",
          description: "Artists or secondary line, shown in serif italic",
        },
        {
          name: "startDate",
          title: "Start Date",
          type: "date",
          options: { dateFormat: "YYYY-MM-DD" },
        },
        {
          name: "endDate",
          title: "End Date",
          type: "date",
          options: { dateFormat: "YYYY-MM-DD" },
          description: "Optional: omit for a single-date event",
        },
        {
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alt Text", type: "string" }],
        },
        {
          name: "themes",
          title: "Theme Keywords",
          type: "array",
          of: [{ type: "string" }],
          description:
            "Curatorial keywords shown in the right-hand rail, e.g. Materia, Territorio",
          options: { layout: "tags" },
        },
        {
          name: "discipline",
          title: "Discipline",
          type: "string",
          description: 'Top of the right rail, e.g. "Escultura expandida"',
        },
        {
          name: "location",
          title: "Location",
          type: "string",
          description: 'Bottom of the right rail, e.g. "Murcia"',
        },
        {
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
          description: 'Defaults to "Ver más" / "Read more" when empty',
        },
        {
          name: "article",
          title: "Linked Article",
          type: "reference",
          to: [{ type: "article" }],
          description: "Where the CTA links to",
          hidden: ({ parent }) => !!parent?.url,
        },
        {
          name: "url",
          title: "External URL",
          type: "url",
          description: "Use instead of Linked Article",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
          hidden: ({ parent }) => !!parent?.article,
        },
      ],
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
