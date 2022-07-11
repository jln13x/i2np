import { Module } from '@nestjs/common';
import { UserModule } from 'user/user.module';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

@Module({
  imports: [UserModule],
  controllers: [NotionController],
  providers: [NotionService],
  exports: [NotionService],
})
export class NotionModule {}
