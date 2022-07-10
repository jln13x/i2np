import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';

@Injectable()
export class NotionService {
  async getMe(token: string) {
    const client = new Client({ auth: token });
    const user = (await client.users.me({})) as unknown;
  }
}
