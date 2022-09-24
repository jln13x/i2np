import { z } from 'zod';

const result = z.object({
  object: z.literal('property_item'),
  type: z.literal('title'),
  title: z.object({
    plain_text: z.string(),
  }),
});

export const titlePropertiesResponseSchema = z.object({
  results: z.array(result),
  type: z.literal('property_item'),
  property_item: z.object({
    type: z.literal('title'),
  }),
});
