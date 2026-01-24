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

// Queries
export async function getArticles() {
  return client.fetch(`
    *[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      mainImage,
      "author": author->name
    }
  `);
}

export async function getArticlesPaginated(
  page: number = 1,
  pageSize: number = 10,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [articles, total] = await Promise.all([
    client.fetch(
      `
      *[_type == "article"] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        category,
        mainImage,
        "author": author->name
      }
    `,
      { start, end },
    ),
    client.fetch(`count(*[_type == "article"])`),
  ]);

  return {
    articles,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getArticle(slug: string) {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      body,
      publishedAt,
      category,
      mainImage,
      gallery,
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
    { slug },
  );
}

export async function getArticlesByCategory(category: string) {
  return client.fetch(
    `
    *[_type == "article" && lower(category) == lower($category)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      category,
      mainImage,
      "author": author->name
    }
  `,
    { category },
  );
}

export async function getArticlesByCategoryPaginated(
  category: string,
  page: number = 1,
  pageSize: number = 10,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [articles, total] = await Promise.all([
    client.fetch(
      `
      *[_type == "article" && lower(category) == lower($category)] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        category,
        mainImage,
        "author": author->name
      }
    `,
      { category, start, end },
    ),
    client.fetch(
      `count(*[_type == "article" && lower(category) == lower($category)])`,
      { category },
    ),
  ]);

  return {
    articles,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getCategories() {
  return client.fetch(`
    array::unique(*[_type == "article"].category)
  `);
}

export async function getRevistas() {
  return client.fetch(`
    *[_type == "revista"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      excerpt,
      publishedAt,
      "pdfUrl": pdf.asset->url
    }
  `);
}

export async function getPrensa() {
  return client.fetch(`
    *[_type == "prensa"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      coverImage,
      excerpt,
      publishedAt,
      "zipUrl": zipFile.asset->url
    }
  `);
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
