import { IsBase64 } from 'class-validator';

export class ProcessImageInput {
  @IsBase64()
  base64Image!: string;
}
