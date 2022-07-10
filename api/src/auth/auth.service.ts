import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
import { z } from 'zod';
import { LoginInput } from './login.input';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  public async login(input: LoginInput) {
    const response = await this.exchangeGrant(input.code);

    const userSchema = z.object({
      id: z.string(),
      person: z.object({
        email: z.string(),
      }),
    });

    const ownerSchema = z.object({
      user: userSchema,
    });

    const accessTokenSchema = z.object({
      access_token: z.string(),
      workspace_id: z.string(),
      workspace_name: z.string().nullable(),
      workspace_icon: z.string().nullable(),
      bot_id: z.string(),
      owner: ownerSchema,
    });

    // TODO Exception handling
    const accessTokenResponse = accessTokenSchema.parse(response.data);

    const {
      access_token,
      owner,
      workspace_id,
      workspace_name,
      workspace_icon,
      bot_id,
    } = accessTokenResponse;

    const accountId = owner.user.id;

    let account = await this.prismaService.account.findFirst({
      where: {
        accountId,
      },
    });

    if (!account) {
      account = await this.prismaService.account.create({
        data: {
          access_token,
          accountId: owner.user.id,
          workspaceId: workspace_id,
          workspaceName: workspace_name,
          workspaceIconUrl: workspace_icon,
          botId: bot_id,
          email: owner.user.person.email,
          User: {
            create: {},
          },
        },
      });
    }

    return account;
  }

  private async exchangeGrant(code: string) {
    const auth = this.getBasicAuthForIntegration();

    const notionTokenEndpoint = process.env.NOTION_TOKEN_ENDPOINT || '';
    const redirectUri = process.env.NOTION_REDIRECT_URI || '';

    console.log({
      notionTokenEndpoint,
      redirectUri,
    });

    return await axios.post(
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
  }

  private getBasicAuthForIntegration = () => {
    return Buffer.from(
      `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`,
    ).toString('base64');
  };
}

/**
 * Reauth
 * If a user who has already added the integration visits your authorization URL again and chooses the same workspace, that user may reauthorize the integration and add or remove the integration from pages in the workspace. The access token received after exchanging the grant will be the same as the initial access token received.
 */

/**
 * {
	"object": "user",
	"id": "5e2e7932-2434-4788-93f2-658e1b0b6760",
	"name": "OCR",
	"avatar_url": null,
	"type": "bot",
	"bot": {
		"owner": {
			"type": "user",
			"user": {
				"object": "user",
				"id": "<dd160302-6ca7-4424-b92c-f35753e23544>",
				"name": "Ada ",
				"avatar_url": null,
				"type": "person",
				"person": {
					"email": "otilia.ondricka57@ethereal.email"
				}
			}
		}
	}
}
 */
