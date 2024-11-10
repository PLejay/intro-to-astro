import { defineCollection, z } from "astro:content";

export const collections = {
  slides: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
    }),
  }),
};
