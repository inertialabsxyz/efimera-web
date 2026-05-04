export type Locale = "es" | "en";

/**
 * Detect language from Astro context.
 * Checks locals (set by middleware) and falls back to request header.
 */
export function getLang(astro: { locals: { lang?: Locale }; request: Request }): Locale {
  if (astro.locals.lang) return astro.locals.lang;
  const header = astro.request.headers.get("x-astro-locale");
  if (header === "en") return "en";
  return "es";
}

const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Navigation
    "nav.home": "Efímera",
    "nav.exposiciones": "Exposiciones",
    "nav.actividades": "Actividades",
    "nav.artistas": "Artistas",
    "nav.entrevistas": "Entrevistas",
    "nav.letras": "Letras",
    "nav.tienda": "Tienda",
    "nav.projects": "Efímera projects",

    // Footer
    "footer.about": "Acerca de",
    "footer.contact": "Contacto",
    "footer.privacy": "Privacidad",
    "footer.prensa": "Prensa",

    // Search
    "search.placeholder": "Buscar artículos...",
    "search.typeToSearch": "Escribe para buscar artículos",
    "search.noResults": "No se encontraron artículos",
    "search.results": "resultados",
    "search.result": "resultado",
    "search.label": "Buscar",

    // Pagination
    "pagination.prev": "Anterior",
    "pagination.next": "Siguiente",

    // Categories
    "cat.Actividades": "Actividades",
    "cat.Artistas": "Artistas",
    "cat.Entrevistas": "Entrevistas",
    "cat.Exposiciones": "Exposiciones",
    "cat.In situ": "In situ",
    "cat.Off-site": "Off-site",
    "cat.Online": "Online",
    "cat.Letras": "Letras",

    // Empty states
    "empty.category": "Aún no hay artículos en esta categoría.",
    "empty.artists": "Aún no hay artistas disponibles.",
    "empty.prensa": "Aún no hay artículos de prensa disponibles.",
    "empty.revista": "Aún no hay revistas disponibles.",
    "empty.products": "Aún no hay productos disponibles.",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.descriptionHomepage":
      "Suscríbete para recibir las últimas novedades de Efímera",
    "newsletter.descriptionFooter": "Suscríbete a nuestro newsletter",
    "newsletter.placeholder": "tu@email.com",
    "newsletter.submit": "Suscribir",
    "newsletter.success": "¡Gracias por suscribirte!",
    "newsletter.error": "Error al suscribirse. Inténtalo de nuevo.",

    // Tienda
    "tienda.title": "Tienda",
    "tienda.selection": "Mi selección",
    "tienda.backToStore": "Volver a la tienda",
    "tienda.inquiryTitle": "Enviar consulta",
    "tienda.inquiryDesc":
      "Déjanos tus datos y te responderemos con más información sobre los productos seleccionados.",
    "tienda.inquirySubmit": "Enviar consulta",
    "tienda.inquirySuccess": "¡Consulta enviada!",
    "tienda.inquiryThanks":
      "Gracias por tu interés. Te responderemos lo antes posible.",
    "tienda.browseMore": "Seguir navegando",
    "tienda.viewStore": "Ver tienda",
    "tienda.emptySelection": "No has seleccionado ningún producto todavía.",
    "tienda.addToSelection": "Añadir a mi selección",
    "tienda.removeFromSelection": "Quitar de mi selección",
    "tienda.added": "Añadido a tu selección",
    "tienda.inquire": "Consultar",
    "tienda.soldOut": "Agotado",
    "tienda.inSelection": "Ya en tu selección",
    "tienda.noProductsInSelection": "No hay productos en tu selección.",
    "tienda.sendError": "Error al enviar. Inténtalo de nuevo.",
    "tienda.connectionError": "Error de conexión. Inténtalo de nuevo.",
    "tienda.formName": "Nombre",
    "tienda.formEmail": "Email",
    "tienda.formMessage": "Mensaje (opcional)",
    "tienda.removeItem": "Eliminar",

    // Article
    "article.related": "Artículos relacionados",

    // Prensa
    "prensa.download": "Descargar ZIP",
    "prensa.back": "Volver a Prensa",

    // About
    "about.title": "Acerca de",

    // Contact
    "contact.title": "Contacto",

    // Privacy
    "privacy.title": "Privacidad",

    // Language
    "lang.switch": "EN",
    "lang.switchLabel": "Switch to English",

    // Meta
    "meta.description": "Espacio de arte contemporáneo",
  },
  en: {
    // Navigation
    "nav.home": "Efímera",
    "nav.exposiciones": "Exhibitions",
    "nav.actividades": "Activities",
    "nav.artistas": "Artists",
    "nav.entrevistas": "Interviews",
    "nav.letras": "Writing",
    "nav.tienda": "Shop",
    "nav.projects": "Efímera projects",

    // Footer
    "footer.about": "About",
    "footer.contact": "Contact",
    "footer.privacy": "Privacy",
    "footer.prensa": "Press",

    // Search
    "search.placeholder": "Search articles...",
    "search.typeToSearch": "Type to search articles",
    "search.noResults": "No articles found",
    "search.results": "results",
    "search.result": "result",
    "search.label": "Search",

    // Pagination
    "pagination.prev": "Previous",
    "pagination.next": "Next",

    // Categories
    "cat.Actividades": "Activities",
    "cat.Artistas": "Artists",
    "cat.Entrevistas": "Interviews",
    "cat.Exposiciones": "Exhibitions",
    "cat.In situ": "In situ",
    "cat.Off-site": "Off-site",
    "cat.Online": "Online",
    "cat.Letras": "Writing",

    // Empty states
    "empty.category": "No articles in this category yet.",
    "empty.artists": "No artists available yet.",
    "empty.prensa": "No press articles available yet.",
    "empty.revista": "No magazines available yet.",
    "empty.products": "No products available yet.",

    // Newsletter
    "newsletter.title": "Newsletter",
    "newsletter.descriptionHomepage":
      "Subscribe to receive the latest news from Efímera",
    "newsletter.descriptionFooter": "Subscribe to our newsletter",
    "newsletter.placeholder": "your@email.com",
    "newsletter.submit": "Subscribe",
    "newsletter.success": "Thank you for subscribing!",
    "newsletter.error": "Subscription error. Please try again.",

    // Tienda
    "tienda.title": "Shop",
    "tienda.selection": "My selection",
    "tienda.backToStore": "Back to shop",
    "tienda.inquiryTitle": "Send inquiry",
    "tienda.inquiryDesc":
      "Leave your details and we will respond with more information about the selected products.",
    "tienda.inquirySubmit": "Send inquiry",
    "tienda.inquirySuccess": "Inquiry sent!",
    "tienda.inquiryThanks":
      "Thank you for your interest. We will respond as soon as possible.",
    "tienda.browseMore": "Continue browsing",
    "tienda.viewStore": "View shop",
    "tienda.emptySelection": "You have not selected any products yet.",
    "tienda.addToSelection": "Add to my selection",
    "tienda.removeFromSelection": "Remove from my selection",
    "tienda.added": "Added to your selection",
    "tienda.inquire": "Inquire",
    "tienda.soldOut": "Sold out",
    "tienda.inSelection": "Already in your selection",
    "tienda.noProductsInSelection": "No products in your selection.",
    "tienda.sendError": "Error sending. Please try again.",
    "tienda.connectionError": "Connection error. Please try again.",
    "tienda.formName": "Name",
    "tienda.formEmail": "Email",
    "tienda.formMessage": "Message (optional)",
    "tienda.removeItem": "Remove",

    // Article
    "article.related": "Related articles",

    // Prensa
    "prensa.download": "Download ZIP",
    "prensa.back": "Back to Press",

    // About
    "about.title": "About",

    // Contact
    "contact.title": "Contact",

    // Privacy
    "privacy.title": "Privacy",

    // Language
    "lang.switch": "ES",
    "lang.switchLabel": "Cambiar a Español",

    // Meta
    "meta.description": "Contemporary art space",
  },
};

export function t(key: string, lang: Locale): string {
  return translations[lang]?.[key] ?? translations.es[key] ?? key;
}

export function getLocalePath(path: string, lang: Locale): string {
  // Strip any existing locale prefix
  const cleanPath = path.replace(/^\/en(\/|$)/, "/");
  if (lang === "es") return cleanPath;
  return `/en${cleanPath === "/" ? "" : cleanPath}`;
}

export function getLangFromUrl(url: URL): Locale {
  return url.pathname.startsWith("/en/") || url.pathname === "/en"
    ? "en"
    : "es";
}

/** Navigation items with their translated labels and paths */
export function getNavItems(lang: Locale) {
  return [
    { label: t("nav.home", lang), href: getLocalePath("/", lang) },
    {
      label: t("nav.exposiciones", lang),
      href: getLocalePath("/category/exposiciones", lang),
    },
    {
      label: t("nav.actividades", lang),
      href: getLocalePath("/category/actividades", lang),
    },
    {
      label: t("nav.artistas", lang),
      href: getLocalePath("/category/artistas", lang),
    },
    {
      label: t("nav.entrevistas", lang),
      href: getLocalePath("/category/entrevistas", lang),
    },
    {
      label: t("nav.letras", lang),
      href: getLocalePath("/category/letras", lang),
    },
    { label: t("nav.tienda", lang), href: getLocalePath("/tienda", lang) },
    {
      label: t("nav.projects", lang),
      href: getLocalePath("/efimera-projects", lang),
    },
  ];
}
