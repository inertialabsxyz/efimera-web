import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Efimera Revista",

  projectId: "msziqj4u",
  dataset: "efimera-data",

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
