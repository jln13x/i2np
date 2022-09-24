import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { NotionService } from './notion.service';
import { AppendToPageRequest } from './request/append-to-page.request';
import { CreatePageRequest } from './request/create-page.request';

@ApiTags('Notion')
@Controller('/notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me() {
    return this.notionService.me();
  }

  @Get('/search')
  async search(@Query('query') query: string) {
    return this.notionService.search(query);
  }

  @Post('/pages/append')
  async appendToPage(@Body() appendToPageRequest: AppendToPageRequest) {
    const { pageId, text } = appendToPageRequest;
    await this.notionService.appendToPage(pageId, text);

    return { success: true };
  }

  @Post('/pages')
  async createPage(@Body() createPageRequest: CreatePageRequest) {
    const { parentId, parentType, title, text } = createPageRequest;
    return await this.notionService.createPage(parentId, title, text, parentType);
  }
}
