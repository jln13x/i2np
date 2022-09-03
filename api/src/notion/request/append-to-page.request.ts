import { IsNotEmpty, IsString } from 'class-validator';

export class AppendToPageRequest {
  @IsString()
  @IsNotEmpty()
  readonly pageId: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
