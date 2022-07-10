import { OcrResponse } from './ocr.response';

export const OCR_SERVICE = 'ocr_service';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OcrService {
  processImage: (image: string) => Promise<OcrResponse | null>;
}
