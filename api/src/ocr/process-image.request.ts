import { IsBase64 } from 'class-validator';

export class ProcessImageRequest {
  @IsBase64()
  base64Image!: string;
}
