export default {
  name: "efimeraProjectsPage",
  title: "Efímera Projects Page",
  type: "document",
  fields: [
    {
      name: "introTitle",
      title: "Introduction Title",
      type: "string",
      description: "Heading for the Efímera Projects landing page",
    },
    {
      name: "introText",
      title: "Introduction Text",
      type: "text",
      rows: 4,
      description: "Introductory paragraph for the projects section",
    },
    {
      name: "inSituImage",
      title: "In Situ Image",
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
      description: "Image for the 'In situ' subcategory card",
    },
    {
      name: "offSiteImage",
      title: "Off-site Image",
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
      description: "Image for the 'Off-site' subcategory card",
    },
    {
      name: "onlineImage",
      title: "Online Image",
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
      description: "Image for the 'Online' subcategory card",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Efímera Projects Page",
        subtitle: "Landing page configuration",
      };
    },
  },
};
