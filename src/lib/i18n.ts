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
    "nav.programacion": "Programación",
    "nav.exposiciones": "Exposiciones",
    "nav.actividades": "Actividades",
    "nav.derivasSonoras": "Derivas sonoras",
    "nav.ruidoDeFondo": "Ruido de fondo",
    "nav.eventos": "Eventos",
    "nav.podcast": "Podcast",
    "nav.artistas": "Artistas",
    "nav.letras": "Letras",
    "nav.entrevistas": "Entrevistas",
    "nav.articulos": "Artículos",
    "nav.revistaXyz": "Revista XYZ",
    "nav.tienda": "Tienda",
    "nav.projects": "Projects",
    "nav.reserva": "Reserva",

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
    "cat.Ruido de fondo": "Ruido de fondo",
    "cat.Eventos": "Eventos",
    "cat.Podcast": "Podcast",

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

    // Home
    "home.constelacion": "Constelación Efímera",
    "home.revista": "Revista XYZ",

    // Constelación
    "constelacion.title": "Constelación Efímera",

    // Reserva
    "reserva.title": "Reserva",
    "reserva.headline": "Reserva Efímera",
    "reserva.intro":
      "¿Tienes una idea, una actividad o un proyecto y necesitas un espacio donde hacerlo?",
    "reserva.description":
      "Efímera abre su espacio en el centro de Murcia para eventos, reuniones, talleres, presentaciones, sesiones de yoga o danza, shootings, catas y otras propuestas de pequeño formato.",
    "reserva.rental":
      "Disponible en alquiler por jornadas o medias jornadas, en un entorno singular rodeado de arte contemporáneo.",
    "reserva.extrasTitle": "¿Necesitas algo más?",
    "reserva.extras":
      "Consúltanos para necesidades especiales de montaje, equipamiento, horarios u otros servicios. La limpieza se facturará aparte.",
    "reserva.cta": "Escríbenos",
    "reserva.availability":
      "Todas las reservas están sujetas a disponibilidad y compatibilidad con la exposición en curso.",

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
    "nav.programacion": "Programme",
    "nav.exposiciones": "Exhibitions",
    "nav.actividades": "Activities",
    "nav.derivasSonoras": "Derivas sonoras",
    "nav.ruidoDeFondo": "Ruido de fondo",
    "nav.eventos": "Events",
    "nav.podcast": "Podcast",
    "nav.artistas": "Artists",
    "nav.letras": "Writing",
    "nav.entrevistas": "Interviews",
    "nav.articulos": "Articles",
    "nav.revistaXyz": "Revista XYZ",
    "nav.tienda": "Shop",
    "nav.projects": "Projects",
    "nav.reserva": "Booking",

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
    "cat.Ruido de fondo": "Ruido de fondo",
    "cat.Eventos": "Events",
    "cat.Podcast": "Podcast",

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

    // Home
    "home.constelacion": "Constelación Efímera",
    "home.revista": "Revista XYZ",

    // Constelación
    "constelacion.title": "Constelación Efímera",

    // Reserva
    "reserva.title": "Booking",
    "reserva.headline": "Book Efímera",
    "reserva.intro":
      "Do you have an idea, an activity or a project and need a space to make it happen?",
    "reserva.description":
      "Efímera opens its space in the centre of Murcia for events, meetings, workshops, presentations, yoga or dance sessions, photo shoots, tastings and other small-format proposals.",
    "reserva.rental":
      "Available to rent by full or half days, in a unique setting surrounded by contemporary art.",
    "reserva.extrasTitle": "Need anything else?",
    "reserva.extras":
      "Ask us about special set-up, equipment or scheduling needs, or any other services. Cleaning is invoiced separately.",
    "reserva.cta": "Write to us",
    "reserva.availability":
      "All bookings are subject to availability and compatibility with the current exhibition.",

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

export interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

/** Navigation items with their translated labels and paths */
export function getNavItems(lang: Locale): NavItem[] {
  return [
    { label: t("nav.home", lang), href: getLocalePath("/", lang) },
    {
      label: t("nav.programacion", lang),
      children: [
        {
          label: t("nav.exposiciones", lang),
          href: getLocalePath("/category/exposiciones", lang),
        },
        {
          label: t("nav.actividades", lang),
          href: getLocalePath("/category/actividades", lang),
        },
      ],
    },
    {
      label: t("nav.derivasSonoras", lang),
      children: [
        {
          label: t("nav.ruidoDeFondo", lang),
          href: getLocalePath("/category/ruido-de-fondo", lang),
        },
        {
          label: t("nav.eventos", lang),
          href: getLocalePath("/category/eventos", lang),
        },
        {
          label: t("nav.podcast", lang),
          href: getLocalePath("/category/podcast", lang),
        },
      ],
    },
    {
      label: t("nav.artistas", lang),
      href: getLocalePath("/category/artistas", lang),
    },
    {
      label: t("nav.letras", lang),
      children: [
        {
          label: t("nav.entrevistas", lang),
          href: getLocalePath("/category/entrevistas", lang),
        },
        {
          label: t("nav.articulos", lang),
          href: getLocalePath("/category/articulos", lang),
        },
        {
          label: t("nav.revistaXyz", lang),
          href: getLocalePath("/revista", lang),
        },
      ],
    },
    {
      label: t("nav.projects", lang),
      href: getLocalePath("/efimera-projects", lang),
    },
    {
      label: t("nav.reserva", lang),
      href: getLocalePath("/reserva", lang),
    },
    { label: t("nav.tienda", lang), href: getLocalePath("/tienda", lang) },
  ];
}
