import { z } from 'zod';

const emoji = z.object({
  type: z.literal('emoji'),
  emoji: z.string(),
});

const icon = z
  .discriminatedUnion('type', [
    emoji,
    z.object({
      type: z.literal('external'),
    }),
    z.object({
      type: z.literal('file'),
    }),
  ])
  .nullable();

const sharedProperties = {
  id: z.string(),
  url: z.string(),
  icon,
};

const titleSchema = z.array(
  z.object({
    plain_text: z.string(),
  }),
);

const page = z.object({
  ...sharedProperties,
  object: z.literal('page'),
});

const database = z.object({
  ...sharedProperties,
  object: z.literal('database'),
  title: titleSchema,
});

const resultSchema = z.discriminatedUnion('object', [page, database]);

const searchResultsSchema = z.array(resultSchema);

export const searchResponseSchema = z.object({
  results: searchResultsSchema,
});
