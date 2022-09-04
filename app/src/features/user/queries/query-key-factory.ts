export const userKeys = {
  all: [{ scope: 'user' }] as const,
  token: (token: string) => [{ ...userKeys.all[0], token }] as const,
};
