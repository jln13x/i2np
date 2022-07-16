export class SearchResultResponse {
  readonly id: string;
  readonly url: string;
  readonly title: string;
  readonly emoji: string | null;

  constructor(id: string, url: string, title: string, emoji: string | null) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.emoji = emoji;
  }
}
