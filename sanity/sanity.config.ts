import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Efimera Revista",

  projectId: "msziqj4u",
  dataset: "efimera-data",

  plugins: [
    structureTool(),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "es", title: "Español" },
        { id: "en", title: "English" },
      ],
      schemaTypes: ["article", "revista"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
