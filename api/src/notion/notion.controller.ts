import { Controller, Get, Query } from '@nestjs/common';
import axios from 'axios';

@Controller('/notion')
export class NotionController {
  @Get('/access-token')
  async getAccessToken(@Query('code') code: string) {
    const notionTokenEndpoint = process.env.NOTION_TOKEN_ENDPOINT;
    const redirectUri = process.env.NOTION_REDIRECT_URI;

    const auth = Buffer.from(
      `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`,
    ).toString('base64');

    const { data } = await axios.post(
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

    return data.access_token;
  }
}
