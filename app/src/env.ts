export const env = { 
  API_URL: process.env.API_URL as string,
  NOTION_CLIENT_ID: process.env.NOTION_CLIENT_ID as string,
  NOTION_REDIRECT_URI: process.env.NOTION_REDIRECT_URI as string,
  NOTION_AUTHORIZATION_ENDPOINT: process.env.NOTION_AUTHORIZATION_ENDPOINT as string,
};

const keys = Object.keys(env) as (keyof typeof env)[];

for (const key of keys) {
  if (!env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
}
