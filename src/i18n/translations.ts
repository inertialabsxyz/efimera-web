export const translations = {
  es: {
    nav: {
      home: "Efímera",
      exhibitions: "Exposiciones",
      activities: "Actividades",
      artists: "Artistas",
      interviews: "Entrevistas",
      letters: "Letras",
      music: "Música",
      magazine: "Revista",
    },
    categories: {
      all: "Todos",
      Actividades: "Actividades",
      Artistas: "Artistas",
      Entrevistas: "Entrevistas",
      Exposiciones: "Exposiciones",
      Letras: "Letras",
      Música: "Música",
    },
    footer: {
      about: "Acerca de",
      contact: "Contacto",
      privacy: "Privacidad",
    },
    article: {
      relatedArticles: "Artículos relacionados",
      noArticles: "Aún no hay artículos en esta categoría.",
      by: "por",
    },
    meta: {
      siteDescription: "Espacio de arte contemporáneo",
    },
  },
  en: {
    nav: {
      home: "Efímera",
      exhibitions: "Exhibitions",
      activities: "Activities",
      artists: "Artists",
      interviews: "Interviews",
      letters: "Letters",
      music: "Music",
      magazine: "Magazine",
    },
    categories: {
      all: "All",
      Actividades: "Activities",
      Artistas: "Artists",
      Entrevistas: "Interviews",
      Exposiciones: "Exhibitions",
      Letras: "Letters",
      Música: "Music",
    },
    footer: {
      about: "About",
      contact: "Contact",
      privacy: "Privacy",
    },
    article: {
      relatedArticles: "Related articles",
      noArticles: "No articles in this category yet.",
      by: "by",
    },
    meta: {
      siteDescription: "Contemporary art space",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.es;

export function t(lang: Language, key: string): string {
  const keys = key.split(".");
  let value: any = translations[lang];

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
}

export function getNavCategories(lang: Language) {
  const tr = translations[lang];
  return [
    { label: tr.nav.home, href: `/${lang}`, key: "home" },
    { label: tr.nav.exhibitions, href: `/${lang}/category/exposiciones`, key: "exposiciones" },
    { label: tr.nav.activities, href: `/${lang}/category/actividades`, key: "actividades" },
    { label: tr.nav.artists, href: `/${lang}/category/artistas`, key: "artistas" },
    { label: tr.nav.interviews, href: `/${lang}/category/entrevistas`, key: "entrevistas" },
    { label: tr.nav.letters, href: `/${lang}/category/letras`, key: "letras" },
    { label: tr.nav.music, href: `/${lang}/category/música`, key: "música" },
    { label: tr.nav.magazine, href: `/${lang}/revista`, key: "revista" },
  ];
}
