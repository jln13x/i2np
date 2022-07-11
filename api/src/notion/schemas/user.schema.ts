import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  person: z.object({
    email: z.string(),
  }),
});
