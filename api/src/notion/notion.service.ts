import { Injectable } from '@nestjs/common';
import { Client } from '@notionhq/client';
import { AccessTokenProviderService } from 'auth/access-token-provider.service';
import axios from 'axios';
import { NOTION } from './constants';
import { InvalidNotionResponseException } from './exceptions/invalid-notion-response.exception';
import { CreatePageResponse } from './response/create-page.response';
import { MeResponse } from './response/me.response';
import { SearchResultResponse } from './response/search-result.response';
import { SearchResultsResponse } from './response/search-results.response';
import { AccessTokenResponse, accessTokenResponseSchema } from './schemas/access-token.schema';
import { botSchema } from './schemas/bot.schema';
import { createPageSchema } from './schemas/create-page.schema';
import { searchResponseSchema } from './schemas/search-schema';
import { titlePropertiesResponseSchema } from './schemas/title-properties.schema';
import { PageType } from './types';
import { textToNotionParagraphs } from './utils/text-to-notion-paragraphs';
import { textToNotionTitle } from './utils/text-to-notion-title';

@Injectable()
export class NotionService {
  constructor(private accessTokenProvider: AccessTokenProviderService) {}

  async exchangeGrant(code: string): Promise<AccessTokenResponse> {
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

    return accessTokenResponseSchema.parse(response.data);
  }

  private getBasicAuthForIntegration = () => {
    return Buffer.from(
      `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`,
    ).toString('base64');
  };

  private async getClient() {
    const token = await this.accessTokenProvider.getAccessToken();

    return new Client({
      auth: token,
    });
  }

  async me() {
    const client = await this.getClient();
    const response = (await client.users.me({})) as unknown;
    const schema = botSchema.safeParse(response);

    if (!schema.success) throw new InvalidNotionResponseException();

    const {
      avatar_url: avatarUrl,
      name,
      id,
      person: { email },
    } = schema.data.bot.owner.user;

    return new MeResponse(id, name, email, avatarUrl);
  }

  async search(query: string) {
    const client = await this.getClient();

    const response = (await client.search({
      page_size: 3,
      query,
    })) as unknown;

    const schema = searchResponseSchema.safeParse(response);

    if (!schema.success) throw new InvalidNotionResponseException(schema.error);

    const results = schema.data.results;

    const searchResults: SearchResultResponse[] = [];

    for (const result of results) {
      let title = '';

      if (result.object === 'page') {
        title = await this.pageTitle(result.id);
      }

      if (result.object === 'database') {
        title = result.title.reduce(
          (title, result) => `${title}${result.plain_text}`,
          '',
        );
      }

      if (title === '') continue;

      const emoji = result?.icon?.type === 'emoji' ? result.icon.emoji : null;

      const searchResult: SearchResultResponse = {
        id: result.id,
        url: result.url,
        title,
        emoji,
        type: result.object === 'page' ? PageType.PAGE : PageType.DATABASE,
      };

      searchResults.push(searchResult);
    }

    return {
      results: searchResults,
    } as SearchResultsResponse;
  }

  async pageTitle(pageId: string): Promise<string> {
    const response = await this.pageProperties(pageId, 'title');

    const schema = titlePropertiesResponseSchema.safeParse(response);

    if (!schema.success) throw new InvalidNotionResponseException();

    const results = schema.data.results;

    return results.reduce(
      (title, result) => `${title}${result.title.plain_text}`,
      '',
    );
  }

  async pageProperties(pageId: string, propertyId: string) {
    const client = await this.getClient();

    const response = await client.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });

    return response;
  }

  async appendToPage(pageId: string, text: string) {
    const client = await this.getClient();
    const formatted = textToNotionParagraphs(text);

    return client.blocks.children.append({
      block_id: pageId,
      children: formatted,
    });
  }

  async createPage(
    parentId: string,
    title: string,
    text: string,
    parentType: PageType,
  ) {
    const client = await this.getClient();
    const formatted = textToNotionParagraphs(text);

    let response: unknown;

    if (parentType === PageType.PAGE) {
      response = (await client.pages.create({
        parent: {
          page_id: parentId,
          type: 'page_id',
        },
        properties: {
          title: textToNotionTitle(title),
        },
        children: formatted,
      })) as unknown;
    }

    if (parentType === PageType.DATABASE) {
      response = (await client.pages.create({
        parent: {
          database_id: parentId,
          type: 'database_id',
        },
        properties: {
          title: textToNotionTitle(title),
        },
        children: formatted,
      })) as unknown;
    }

    const schema = createPageSchema.safeParse(response);

    if (!schema.success) throw new InvalidNotionResponseException(schema.error);

    return {
      url: schema.data.url,
    } as CreatePageResponse;
  }
}
