import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { IsPublic } from 'auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { GetUser } from 'common/decorator/get-user.decorator';
import { NotionService } from './notion.service';

@Controller('/notion')
export class NotionController {
  constructor(private notionService: NotionService) {}

  // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbDVmZGN5aTkwMDAzZTNhMzUzcGViNmNpIiwiaWF0IjoxNjU3NDgwNjM1fQ.7HluGVZzbNhjXZcwY8ORG5g77GYH4X75s9RNqqhXmEU
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async me(@GetUser() user: User) {
    return this.notionService.getMe(user);
  }

  @IsPublic()
  @Get('/public')
  public() {
    return 'public';
  }
}
