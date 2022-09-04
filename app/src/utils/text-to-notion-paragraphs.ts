export const textToNotionParagraphs = (text: string) => {
  const paragraphs = getParagraphs(text);

  const formattedParagraphs = [];

  for (const paragraph of paragraphs) {
    formattedParagraphs.push(toNotionParagraph(paragraph));
  }

  return formattedParagraphs;
};

const getParagraphs = (text: string) => {
  return text.split(/\n/);
};

const toNotionParagraph = (text: string) => {
  return {
    type: 'paragraph' as const,
    paragraph: {
      rich_text: [
        {
          text: {
            content: text,
          },
        },
      ],
    },
  };
};
