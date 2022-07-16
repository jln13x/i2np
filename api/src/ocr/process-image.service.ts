import { Inject, Injectable } from '@nestjs/common';
import { OcrService, OCR_SERVICE } from './external/ocr-service';
import { ProcessImageRequest } from './process-image.request';
import { ProcessImageResponse } from './process-image.response';

@Injectable()
export class ProcessImageService {
  constructor(
    @Inject(OCR_SERVICE)
    private readonly ocrService: OcrService,
  ) {}

  async processImage(processImageRequest: ProcessImageRequest) {
    const processedImage = await this.ocrService.processImage(
      processImageRequest.base64Image,
    );

    if (!processedImage) return null;

    return new ProcessImageResponse(processedImage.detectedText);
  }
}
