export const pageDatabaseSearchKeys = {
  all: [{ scope: 'pageDatabaseSearch' }] as const,
  search: (query: string) =>
    [{ ...pageDatabaseSearchKeys.all[0], query }] as const,
};
