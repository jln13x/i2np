import { z } from 'zod';
import { ownerSchema } from './owner.schema';

export const botSchema = z.object({
  bot: z.object({
    owner: ownerSchema,
  }),
});
