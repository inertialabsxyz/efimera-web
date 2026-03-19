import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

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
});
