import { PageType } from '../types';

export class SearchResultResponse {
  type: PageType;
  id: string;
  url: string;
  title: string;
  emoji: string | null;
}
