import { z } from 'zod';
import { userSchema } from './user.schema';

export const ownerSchema = z.object({
  user: userSchema,
});
