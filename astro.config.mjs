import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "hybrid",
  adapter: vercel({
    nodeVersion: "20.x",
  }),
  image: {
    domains: ["cdn.sanity.io"],
  },
});
