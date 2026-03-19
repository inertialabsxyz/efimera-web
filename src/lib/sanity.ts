import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { Locale } from "./i18n";

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

// Language filter: matches documents in the given language (or without a language field for backwards compat)
function langFilter(lang: Locale) {
  if (lang === "en") return `language == "en"`;
  return `(!defined(language) || language == "es")`;
}

// Article fields used in list queries
const articleListFields = `
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  category,
  mainImage,
  "author": author->name
`;

// Article fields used in detail queries
const articleDetailFields = `
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
`;

export async function getArticles(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "article" && ${langFilter(lang)}] | order(publishedAt desc) {
      ${articleListFields}
    }
  `);
}

export async function getArticlesPaginated(
  page: number = 1,
  pageSize: number = 10,
  lang: Locale = "es",
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [articles, total] = await Promise.all([
    client.fetch(
      `
      *[_type == "article" && ${langFilter(lang)}] | order(publishedAt desc) [$start...$end] {
        ${articleListFields}
      }
    `,
      { start, end },
    ),
    client.fetch(
      `count(*[_type == "article" && ${langFilter(lang)}])`,
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

export async function getArticle(slug: string, lang: Locale = "es") {
  return client.fetch(
    `
    *[_type == "article" && slug.current == $slug && ${langFilter(lang)}][0] {
      ${articleDetailFields}
    }
  `,
    { slug },
  );
}

export async function getArticlesByCategory(
  category: string,
  lang: Locale = "es",
) {
  return client.fetch(
    `
    *[_type == "article" && lower(category) == lower($category) && ${langFilter(lang)}] | order(publishedAt desc) {
      ${articleListFields}
    }
  `,
    { category },
  );
}

export async function getArticlesByCategoryPaginated(
  category: string,
  page: number = 1,
  pageSize: number = 10,
  lang: Locale = "es",
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [articles, total] = await Promise.all([
    client.fetch(
      `
      *[_type == "article" && lower(category) == lower($category) && ${langFilter(lang)}] | order(publishedAt desc) [$start...$end] {
        ${articleListFields}
      }
    `,
      { category, start, end },
    ),
    client.fetch(
      `count(*[_type == "article" && lower(category) == lower($category) && ${langFilter(lang)}])`,
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
    array::unique(*[_type == "article" && (!defined(language) || language == "es")].category)
  `);
}

export async function getRevistas(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "revista" && ${langFilter(lang)}] | order(publishedAt desc) {
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

export async function getPrensa(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "prensa" && ${langFilter(lang)}] | order(publishedAt desc) {
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

// Artist queries (no translation — proper nouns)
export async function getArtists() {
  return client.fetch(`
    *[_type == "artist"] | order(name asc) {
      _id,
      name,
      slug,
      image
    }
  `);
}

export async function getArtist(slug: string) {
  return client.fetch(
    `
    *[_type == "artist" && slug.current == $slug][0] {
      _id,
      name,
      slug,
      image,
      "relatedArticles": relatedArticles[]->{
        _id,
        title,
        slug,
        mainImage,
        category
      }
    }
  `,
    { slug },
  );
}

// Product queries
const productListFields = `
  _id,
  title,
  slug,
  mainImage,
  "artist": artist->{_id, name, slug},
  price,
  available,
  description
`;

const productDetailFields = `
  _id,
  title,
  slug,
  mainImage,
  gallery,
  "artist": artist->{_id, name, slug},
  price,
  available,
  description,
  body,
  publishedAt
`;

export async function getProducts(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "product" && ${langFilter(lang)}] | order(orderRank asc) {
      ${productListFields}
    }
  `);
}

export async function getProduct(slug: string, lang: Locale = "es") {
  return client.fetch(
    `
    *[_type == "product" && slug.current == $slug && ${langFilter(lang)}][0] {
      ${productDetailFields}
    }
  `,
    { slug },
  );
}

export async function getProductsByArtistPaginated(
  artistId: string,
  page: number = 1,
  pageSize: number = 8,
  lang: Locale = "es",
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [products, total] = await Promise.all([
    client.fetch(
      `
      *[_type == "product" && artist._ref == $artistId && ${langFilter(lang)}] | order(orderRank asc) [$start...$end] {
        ${productListFields}
      }
    `,
      { artistId, start, end },
    ),
    client.fetch(
      `count(*[_type == "product" && artist._ref == $artistId && ${langFilter(lang)}])`,
      { artistId },
    ),
  ]);

  return {
    products,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getEfimeraProjectsPage(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "efimeraProjectsPage" && ${langFilter(lang)}][0] {
      _id,
      introTitle,
      introText,
      inSituImage,
      offSiteImage,
      onlineImage
    }
  `);
}

export async function getFeaturedGallery(lang: Locale = "es") {
  return client.fetch(`
    *[_type == "featuredGallery" && ${langFilter(lang)}][0] {
      _id,
      slides[] {
        _type,
        image,
        title,
        excerpt,
        url,
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
