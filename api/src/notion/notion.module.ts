import { Module } from '@nestjs/common';
import { NotionController } from './notion.controller';

@Module({
  controllers: [NotionController],
})
export class NotionModule {}
