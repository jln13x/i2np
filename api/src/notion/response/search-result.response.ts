import { ApiProperty } from '@nestjs/swagger';

export class SearchResultResponse {
  @ApiProperty({ enum: ['page', 'database'] })
  type: 'page' | 'database';
  id: string;
  url: string;
  title: string;
  emoji: string | null;
}
