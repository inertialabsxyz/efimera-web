export default {
  name: "product",
  title: "Product",
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
      name: "mainImage",
      title: "Main Image",
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
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
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
        },
      ],
      description:
        "Additional images shown in a carousel on the product detail page.",
    },
    {
      name: "artist",
      title: "Artist",
      type: "reference",
      to: [{ type: "artist" }],
      description: "The artist associated with this product.",
    },
    {
      name: "price",
      title: "Price (€)",
      type: "number",
      validation: (Rule) => Rule.required().positive(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      description: "Short description shown on the product detail page.",
    },
    {
      name: "body",
      title: "Body",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
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
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
      description: "Rich text content for the product detail page.",
    },
    {
      name: "available",
      title: "Available",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to mark as sold/unavailable.",
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
      price: "price",
      media: "mainImage",
      available: "available",
    },
    prepare({ title, price, media, available }) {
      const status = available === false ? " · Agotado" : "";
      return {
        title,
        subtitle: `${price ? price + " €" : "Sin precio"}${status}`,
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
    {
      title: "Price, Low to High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
};
