// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import svelte from "@astrojs/svelte";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [react({
    include: ["./src/components/react/*"],
  }), svelte({
    include: ["./src/components/svelte/*"],
  }), mdx()],
});