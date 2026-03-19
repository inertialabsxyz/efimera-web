import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Check if this is a rewritten request from /en
  const localeHeader = context.request.headers.get("x-astro-locale");
  if (localeHeader === "en") {
    context.locals.lang = "en";
    return next();
  }

  // For /en routes, rewrite to the base path with a custom header to signal locale
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const newPath = pathname.replace(/^\/en(\/|$)/, "/") || "/";
    const newUrl = new URL(newPath, context.url);
    newUrl.search = context.url.search;

    // Create new request with custom header to signal the locale
    const headers = new Headers(context.request.headers);
    headers.set("x-astro-locale", "en");

    return context.rewrite(
      new Request(newUrl, {
        method: context.request.method,
        headers,
        body: context.request.body,
      }),
    );
  }

  context.locals.lang = "es";
  return next();
});
