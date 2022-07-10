import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProcessImageService } from './process-image.service';
import { ProcessImageInput } from './process-image.input';

@Controller('/ocr')
export class OcrController {
  constructor(private readonly processImageService: ProcessImageService) {}

  @Post('/process-image')
  async processImage(
    @Body(ValidationPipe) processImageRequest: ProcessImageInput,
  ) {
    return this.processImageService.processImage(processImageRequest);
  }
}
