import { z } from 'zod';
import { ownerSchema } from './owner.schema';

export const accessTokenResponseSchema = z.object({
  access_token: z.string(),
  workspace_id: z.string(),
  workspace_name: z.string().nullable(),
  workspace_icon: z.string().nullable(),
  bot_id: z.string(),
  owner: ownerSchema,
});

export type AccessTokenResponse = z.infer<typeof accessTokenResponseSchema>;
