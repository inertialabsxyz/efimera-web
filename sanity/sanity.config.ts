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
        // Document types that support translation
        const translatableTypes = [
          { type: "article", title: "Articles" },
          { type: "product", title: "Products" },
          { type: "revista", title: "Revistas" },
          { type: "prensa", title: "Prensa" },
          { type: "efimeraProjectsPage", title: "Efímera Projects" },
          { type: "featuredGallery", title: "Featured Gallery" },
        ];

        const translatableTypeIds = translatableTypes.map((t) => t.type);

        // Create language-filtered lists for each translatable type
        const translatableItems = translatableTypes.map(({ type, title }) =>
          S.listItem()
            .title(title)
            .child(
              S.list()
                .title(title)
                .items([
                  S.listItem()
                    .title("Español")
                    .child(
                      S.documentTypeList(type)
                        .title(`${title} — Español`)
                        .filter(`_type == $type && (!defined(language) || language == "es")`)
                        .params({ type }),
                    ),
                  S.listItem()
                    .title("English")
                    .child(
                      S.documentTypeList(type)
                        .title(`${title} — English`)
                        .filter(`_type == $type && language == "en"`)
                        .params({ type }),
                    ),
                  S.divider(),
                  S.listItem()
                    .title("All")
                    .child(
                      S.documentTypeList(type).title(`${title} — All`),
                    ),
                ]),
            ),
        );

        // Non-translatable types (artist, author, etc.)
        const otherItems = S.documentTypeListItems().filter(
          (item) => !translatableTypeIds.includes(item.getId() || ""),
        );

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
            ...translatableItems,
            S.divider(),
            ...otherItems,
          ]);
      },
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
