import { z } from 'zod';

const notionSchema = z.object({
  TOKEN_ENDPOINT: z.string(),
  REDIRECT_URI: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
});

const envs = {
  TOKEN_ENDPOINT: process.env.NOTION_TOKEN_ENDPOINT,
  REDIRECT_URI: process.env.NOTION_REDIRECT_URI,
  CLIENT_ID: process.env.NOTION_CLIENT_ID,
  CLIENT_SECRET: process.env.NOTION_CLIENT_SECRET,
};

export const NOTION = notionSchema.parse(envs);
