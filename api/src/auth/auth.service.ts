import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LoginRequest as LoginRequest } from './login/login.request';
import { AccessTokenEncryptionService } from './access-token-encryption.service';
import { JwtService } from '@nestjs/jwt';
import { NotionService } from 'notion/notion.service';

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
      const email = owner.user.person.email;
      const encryptedAccessToken =
        await this.accessTokenEncryptionService.encrypt(access_token, email);

      account = await this.prismaService.account.create({
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

    return this.jwtService.sign({
      sub: account.userId,
    });
  }
}
