export const textToNotionTitle = (title: string) => {
  return {
    type: 'title' as const,
    title: [
      {
        type: 'text' as const,
        text: {
          content: title,
        },
      },
    ],
  };
};
