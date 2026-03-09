import { defineCollection, z } from "astro:content";

const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
    listed: z.boolean().default(true),
  }),
});

export const collections = { writing };
