export interface Vertex {
  x: number;
  y: number;
}

interface TextNode {
  text: string;
  confidence?: number;
  vertices: Vertex[];
}

export interface Response {
  textNodes: TextNode[];
  detectedText: string;
}

export class OcrResponse implements Response {
  textNodes: TextNode[];
  detectedText: string;

  constructor(textNodes: TextNode[], detectedText: string) {
    this.textNodes = textNodes;
    this.detectedText = detectedText;
  }
}
