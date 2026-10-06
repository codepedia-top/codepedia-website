import { z } from "zod";

export const metadataSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(1),
    author: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    image: z.url(),
    tags: z.array(z.string()).min(1),
    readingTime: z.number().positive(),
    featured: z.boolean(),
    draft: z.boolean().default(false),
  })
  .superRefine((metadata, ctx) => {
    if (metadata.updatedAt.getTime() < metadata.publishedAt.getTime()) {
      ctx.addIssue({
        code: "custom",
        message: `updatedAt (${metadata.updatedAt.toISOString()}) must not be earlier than publishedAt (${metadata.publishedAt.toISOString()})`,
      });
    }
  });

export type Metadata = z.infer<typeof metadataSchema>;

export type BlogType = {
  slug: string;
  metadata: Metadata;
};

export type CategoryType = {
  title: string;
  stories: BlogType[];
};