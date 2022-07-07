import {
  getParagraphs,
  stringToNotionFormat,
} from "../src/utils/notion/string-to-notion-format";

describe("Format string to the required Notion Format", () => {
  describe("format", () => {
    it("should return return an array of paragraphs", () => {
      const input = "Hello World\n\nThis is a test";

      const result = stringToNotionFormat(input);
      expect(result).toHaveLength(3);
    });
  });

  describe("paragraph", () => {
    const dataset = [
      {
        input: "Hello World\nThis is a test",
        expectedParagraphs: 2,
      },
      {
        input: "Hello World\n\nThis is a test",
        expectedParagraphs: 3,
      },
      {
        input: "Hello World\n\n\nThis is a test",
        expectedParagraphs: 4,
      },
      {
        input: "Hello World\n\n\n\nThis is a test",
        expectedParagraphs: 5,
      },
      {
        input: "Hello World\n       \n    \n  \nThis is a test",
        expectedParagraphs: 5,
      },
    ];

    it.each(dataset)(
      "should return paragraphs",
      ({ input, expectedParagraphs }) => {
        expect(getParagraphs(input)).toHaveLength(expectedParagraphs);
      }
    );
  });

  // describe("ordered list", () => {
  //   expect(findOrderedListStart("a. Hello World\nA. This is a test")).toEqual(
  //     "foo"
  //   );
  // });
});
