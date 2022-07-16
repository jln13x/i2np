import { forwardRef, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AuthModule } from 'auth/auth.module';
import { InvalidNotionResponseExceptionFilter } from './exceptions/invalid-notion-response.exception.filter';
import { NotionController } from './notion.controller';
import { NotionService } from './notion.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [NotionController],
  providers: [
    NotionService,
    {
      provide: APP_FILTER,
      useClass: InvalidNotionResponseExceptionFilter,
    },
  ],
  exports: [NotionService],
})
export class NotionModule {}
