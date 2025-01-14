import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import htmx from "astro-htmx";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), htmx(), react()],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});