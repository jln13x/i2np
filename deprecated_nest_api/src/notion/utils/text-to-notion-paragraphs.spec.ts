import { textToNotionParagraphs } from './text-to-notion-paragraphs';

describe('Format string to the required Notion Format', () => {
  const dataset = [
    {
      input: 'Hello World\nThis is a test',
      expectedParagraphs: 2,
    },
    {
      input: 'Hello World\n\nThis is a test',
      expectedParagraphs: 3,
    },
    {
      input: 'Hello World\n\n\nThis is a test',
      expectedParagraphs: 4,
    },
    {
      input: 'Hello World\n\n\n\nThis is a test',
      expectedParagraphs: 5,
    },
    {
      input: 'Hello World\n       \n    \n  \nThis is a test',
      expectedParagraphs: 5,
    },
  ];

  it.each(dataset)(
    'should return an array with the expected number of paragraphs',
    ({ input, expectedParagraphs }) => {
      expect(textToNotionParagraphs(input)).toHaveLength(expectedParagraphs);
    },
  );
});
