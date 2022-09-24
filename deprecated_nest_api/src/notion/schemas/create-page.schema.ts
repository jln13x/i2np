import { z } from 'zod';

export const createPageSchema = z.object({
  url: z.string(),
});
