export const userKeys = {
  all: [{ scope: 'user' }] as const,
  jwt: (jwt: string) => [{ ...userKeys.all[0], jwt }] as const,
};
