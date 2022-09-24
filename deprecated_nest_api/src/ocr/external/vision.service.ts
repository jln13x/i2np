import { Injectable } from '@nestjs/common';
import { OcrService } from './ocr-service';
import vision, { ImageAnnotatorClient } from '@google-cloud/vision';
import { OcrResponse } from './ocr.response';

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

    return new OcrResponse(detectedText);
  }
}
