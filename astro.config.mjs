// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      DATOCMS_CDA_TOKEN: {
        type: "string",
        access: "secret",
        context: "server",
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});