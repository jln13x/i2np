import {
  BlockObjectRequest,
  CreatePageBodyParameters,
  RichTextItemRequest,
} from "../../notion-types";

type Foo = Array<BlockObjectRequest>;

export const stringToNotionFormat = (text: string) => {
  const paragraphs = getParagraphs(text);

  const foo = [];

  for (const paragraph of paragraphs) {
    foo.push(toNotionParagraph(paragraph));
  }

  return foo;
};

export const getParagraphs = (text: string) => {
  return text.split(/\n/);
};

export const toNotionParagraph = (text: string): BlockObjectRequest => {
  return {
    type: "paragraph",
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

type Title =
  | RichTextItemRequest[]
  | { title: RichTextItemRequest[]; type?: "title" | undefined }
  | undefined;

export const toNotionTitle = (title: string): Title => {
  return {
    type: "title",
    title: [
      {
        type: "text",
        text: {
          content: title,
        },
      },
    ],
  };
};
