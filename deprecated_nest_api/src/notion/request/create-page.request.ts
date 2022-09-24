import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PageType } from '../types';

export class CreatePageRequest {
  @IsString()
  @IsNotEmpty()
  readonly parentId: string;

  @IsNotEmpty()
  @IsEnum(PageType)
  readonly parentType: PageType;

  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;
}
