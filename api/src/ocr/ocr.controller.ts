import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ProcessImageService } from './process-image.service';
import { ProcessImageRequest } from './process-image.request';
import { ApiTags } from '@nestjs/swagger';
import { ProcessImageResponse } from './process-image.response';

@ApiTags('Ocr')
@Controller('/ocr')
export class OcrController {
  constructor(private readonly processImageService: ProcessImageService) {}

  @Post('/process-image')
  async processImage(
    @Body(ValidationPipe) processImageInput: ProcessImageRequest,
  ): Promise<ProcessImageResponse> {
    const processedImage = await this.processImageService.processImage(
      processImageInput,
    );

    if (!processedImage) {
      throw new Error('Could not process image');
    }

    return processedImage;
  }
}
