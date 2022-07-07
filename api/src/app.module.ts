import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotionModule } from './notion/notion.module';
import { OcrModule } from './ocr/ocr.module';

@Module({
  imports: [ConfigModule.forRoot(), OcrModule, NotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
