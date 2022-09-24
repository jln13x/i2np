import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequest as LoginRequest } from './login/login.request';
import { AccessTokenEncryptionService } from './access-token-encryption.service';
import { JwtService } from '@nestjs/jwt';
import { NotionService } from 'notion/notion.service';
import { AccessTokenResponse } from 'notion/schemas';
import { Account } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private accessTokenEncryptionService: AccessTokenEncryptionService,
    private jwtService: JwtService,
    private notionService: NotionService,
  ) {}

  public async login(request: LoginRequest) {
    const accessTokenResponse = await this.notionService.exchangeGrant(
      request.code,
    );

    const accountId = accessTokenResponse.owner.user.id;

    let account = await this.prismaService.account.findFirst({
      where: {
        accountId,
      },
    });

    // No account exists yet, create one
    account = !account
      ? await this.createAccount(accessTokenResponse)
      : await this.updateAccount(account, accessTokenResponse);

    return this.jwtService.sign({
      sub: account.userId,
    });
  }

  private async createAccount(accessTokenResponse: AccessTokenResponse) {
    const {
      access_token,
      owner,
      workspace_id,
      workspace_name,
      workspace_icon,
      bot_id,
    } = accessTokenResponse;

    const email = owner.user.person.email;

    const encryptedAccessToken =
      await this.accessTokenEncryptionService.encrypt(access_token, email);

    return await this.prismaService.account.create({
      data: {
        accessToken: encryptedAccessToken,
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

  private async updateAccount(
    account: Account,
    accessTokenResponse: AccessTokenResponse,
  ) {
    const {
      access_token,
      owner,
      workspace_id,
      workspace_name,
      workspace_icon,
      bot_id,
    } = accessTokenResponse;

    let updateData: Partial<Account> = {};

    const email = owner.user.person.email;

    // A new workspace was chosen
    if (account.workspaceId !== workspace_id) {
      const encryptedAccessToken =
        await this.accessTokenEncryptionService.encrypt(access_token, email);

      updateData = {
        accessToken: encryptedAccessToken,
        workspaceId: workspace_id,
        workspaceName: workspace_name,
        workspaceIconUrl: workspace_icon,
        botId: bot_id,
      };
    }

    return await this.prismaService.account.update({
      where: {
        accountId: account.accountId,
      },
      data: {
        ...updateData,
        email,
      },
    });
  }
}
