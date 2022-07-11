import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { User } from '@prisma/client';
import axios from 'axios';
import { UserService } from 'user/user.service';
import { NOTION } from './constants';
import { AccessToken, accessTokenSchema } from './schemas/access-token.schema';

@Injectable()
export class NotionService {
  constructor(private userService: UserService) {}

  async exchangeGrant(code: string): Promise<AccessToken> {
    const auth = this.getBasicAuthForIntegration();

    const notionTokenEndpoint = NOTION.TOKEN_ENDPOINT;
    const redirectUri = NOTION.REDIRECT_URI;

    const response = await axios.post(
      notionTokenEndpoint,
      {
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      },
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        validateStatus: (status) => status < 500,
      },
    );

    return accessTokenSchema.parse(response.data);
  }

  private getBasicAuthForIntegration = () => {
    return Buffer.from(
      `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`,
    ).toString('base64');
  };

  private async getClient(token: string) {
    return new Client({
      auth: token,
    });
  }

  async getMe(user: User) {
    const accessToken = await this.userService.getNotionAccessToken(user);
    console.log(accessToken);
    const client = await this.getClient(accessToken);
    const userResponse = (await client.users.me({})) as unknown;

    return userResponse;
  }
}
