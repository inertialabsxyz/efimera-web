import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Efimera Revista",

  projectId: "msziqj4u",
  dataset: "efimera-data",

  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Content")
          .items([
            orderableDocumentListDeskItem({
              type: "product",
              title: "Products (ordered)",
              S,
              context,
            }),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() !== "product",
            ),
          ]);
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
