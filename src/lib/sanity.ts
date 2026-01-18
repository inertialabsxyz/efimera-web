import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Supported languages
export const languages = [
  { id: "es", title: "Español" },
  { id: "en", title: "English" },
] as const;

export type Language = (typeof languages)[number]["id"];

export const defaultLanguage: Language = "es";

// Queries
// Note: We use (language == $language || (!defined(language) && $language == "es"))
// to treat articles without a language field as Spanish (backwards compatible)
export async function getArticles(language: Language = defaultLanguage) {
  return client.fetch(
    `
    *[_type == "article" && (language == $language || (!defined(language) && $language == "es"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      mainImage,
      language,
      "author": author->name
    }
  `,
    { language },
  );
}

export async function getArticle(
  slug: string,
  language: Language = defaultLanguage,
) {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug && (language == $language || (!defined(language) && $language == "es"))][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      category,
      mainImage,
      gallery,
      language,
      "author": author->{name, image},
      "relatedArticles": relatedArticles[]->{
        _id,
        title,
        slug,
        excerpt,
        mainImage,
        category
      }
    }
  `,
    { slug, language },
  );
}

export async function getArticlesByCategory(
  category: string,
  language: Language = defaultLanguage,
) {
  return client.fetch(
    `
    *[_type == "article" && lower(category) == lower($category) && (language == $language || (!defined(language) && $language == "es"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      mainImage,
      language,
      "author": author->name
    }
  `,
    { category, language },
  );
}

export async function getCategories() {
  return client.fetch(`
    array::unique(*[_type == "article"].category)
  `);
}

export async function getRevistas(language: Language = defaultLanguage) {
  return client.fetch(
    `
    *[_type == "revista" && (language == $language || (!defined(language) && $language == "es"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      excerpt,
      publishedAt,
      language,
      "pdfUrl": pdf.asset->url
    }
  `,
    { language },
  );
}

export async function getFeaturedGallery() {
  return client.fetch(`
    *[_type == "featuredGallery"][0] {
      slides[] {
        _type,
        image,
        title,
        excerpt,
        displayWidth,
        displayHeight,
        "article": article->{
          _id,
          title,
          slug,
          excerpt
        },
        "revista": revista->{
          _id,
          title,
          coverImage,
          excerpt,
          "pdfUrl": pdf.asset->url
        }
      }
    }
  `);
}

// Helper to get all article slugs for static generation
export async function getAllArticleSlugs() {
  return client.fetch(`
    *[_type == "article"] {
      "slug": slug.current,
      language
    }
  `);
}

// Helper to get all revista slugs for static generation
export async function getAllRevistaSlugs() {
  return client.fetch(`
    *[_type == "revista"] {
      "slug": slug.current,
      language
    }
  `);
}
