/**
 * One-time migration script to backfill `language: "es"` on all existing documents.
 *
 * Usage:
 *   npx sanity exec migrations/addLanguageField.ts --with-user-token
 *
 * Or with ts-node / tsx:
 *   SANITY_PROJECT_ID=msziqj4u SANITY_DATASET=efimera-data npx tsx migrations/addLanguageField.ts
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "msziqj4u",
  dataset: "efimera-data",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN, // needs write access
});

const TYPES_TO_MIGRATE = [
  "article",
  "product",
  "revista",
  "prensa",
  "efimeraProjectsPage",
  "featuredGallery",
];

async function migrate() {
  const query = `*[_type in $types && !defined(language)]{ _id, _type }`;
  const docs = await client.fetch(query, { types: TYPES_TO_MIGRATE });

  console.log(`Found ${docs.length} documents without a language field.`);

  if (docs.length === 0) {
    console.log("Nothing to migrate.");
    return;
  }

  const transaction = client.transaction();
  for (const doc of docs) {
    transaction.patch(doc._id, (patch) => patch.set({ language: "es" }));
  }

  const result = await transaction.commit();
  console.log(`Migration complete. Updated ${result.documentIds.length} documents.`);
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
