import { Module } from '@nestjs/common';
import { OCR_SERVICE } from './external/ocr-service';
import { VisionService } from './external/vision.service';
import { OcrController } from './ocr.controller';
import { ProcessImageService } from './process-image.service';

@Module({
  imports: [],
  controllers: [OcrController],
  providers: [
    ProcessImageService,
    {
      useClass: VisionService,
      provide: OCR_SERVICE,
    },
  ],
})
export class OcrModule {}
