import type {
  DatabaseObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';

export const getTitle = (
  target: DatabaseObjectResponse | PageObjectResponse
) => {
  if (target.object === 'database') {
    return fromRichText(target.title);
  }

  const properties = Object.values(target.properties);

  for (const property of properties) {
    if (property.type === 'title') {
      return fromRichText(property.title);
    }
  }

  return '';
};

const fromRichText = (richText: RichTextItemResponse[]) =>
  richText.reduce((title, result) => `${title}${result.plain_text}`, '');
