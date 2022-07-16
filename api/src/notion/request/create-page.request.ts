import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePageRequest {
  @IsString()
  @IsNotEmpty()
  readonly pageId: string;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
