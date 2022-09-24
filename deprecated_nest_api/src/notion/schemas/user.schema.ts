import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar_url: z.string().nullable(),
  person: z.object({
    email: z.string(),
  }),
});
