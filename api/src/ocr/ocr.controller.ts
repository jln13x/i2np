import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProcessImageService } from './process-image.service';
import { ProcessImageRequest } from './ProcessImageRequest';

@Controller('/ocr')
export class OcrController {
  constructor(private readonly processImageService: ProcessImageService) {}

  @Post('/process-image')
  async processImage(
    @Body(ValidationPipe) processImageRequest: ProcessImageRequest,
  ) {
    return this.processImageService.processImage(processImageRequest);
  }
}
