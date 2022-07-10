import { Injectable } from '@nestjs/common';
import { OcrService } from './ocr-service';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { OcrResponse, Vertex } from './ocr.response';

@Injectable()
export class VisionService implements OcrService {
  client: ImageAnnotatorClient;

  constructor() {
    this.client = new vision.ImageAnnotatorClient();
  }

  async processImage(image: string) {
    const [result] = await this.client.annotateImage({
      image: {
        content: image,
      },
      features: [
        {
          type: 'TEXT_DETECTION',
        },
      ],
    });

    const textAnnotations = result.textAnnotations;

    if (!textAnnotations) return null;

    const detectedText = textAnnotations.shift()?.description;

    if (!detectedText) return null;

    const textNodes: OcrResponse['textNodes'] = [];
    for (const node of textAnnotations) {
      const vertices = node.boundingPoly?.vertices;
      const description = node.description;

      if (!vertices || !description) continue;

      const validVertices = vertices.filter(
        (vertex) => vertex.x && vertex.y,
      ) as Vertex[];

      textNodes.push({
        text: description,
        vertices: validVertices,
      });
    }

    return new OcrResponse(textNodes, detectedText);
  }
}
