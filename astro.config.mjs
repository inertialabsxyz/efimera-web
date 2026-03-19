import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import fs from "node:fs";

// Add /en/* routes to Vercel output config so the serverless function handles them
function vercelI18nRoutes() {
  return {
    name: "vercel-i18n-routes",
    hooks: {
      "astro:build:done": () => {
        const configPath = ".vercel/output/config.json";
        if (!fs.existsSync(configPath)) return;
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        // Add a catch-all /en/* route before the last route
        const enRoute = { src: "^/en(/.*)?$", dest: "_render" };
        // Insert before the last entry (the root route)
        const lastIndex = config.routes.length - 1;
        config.routes.splice(lastIndex, 0, enRoute);
        fs.writeFileSync(configPath, JSON.stringify(config, null, "\t"));
      },
    },
  };
}

export default defineConfig({
  output: "server",
  adapter: vercel({
    nodeVersion: "20.x",
  }),
  image: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [vercelI18nRoutes()],
});
