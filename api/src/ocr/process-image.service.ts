import { Inject, Injectable } from '@nestjs/common';
import { OcrService, OCR_SERVICE } from './external/ocr-service';
import { ProcessImageInput } from './process-image.input';

@Injectable()
export class ProcessImageService {
  constructor(
    @Inject(OCR_SERVICE)
    private readonly ocrService: OcrService,
  ) {}

  async processImage(processImageRequest: ProcessImageInput) {
    return this.ocrService.processImage(processImageRequest.base64Image);
  }

  // isImage(file: Express.Multer.File) {
  //   return file.mimetype.startsWith('image/');
  // }

  // fileToBase64(file: Express.Multer.File) {
  //   return file.buffer.toString('base64');
  // }
}
