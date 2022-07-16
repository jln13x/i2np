import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User as PrismaUser } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { AccessTokenEncryptionService } from './access-token-encryption.service';

@Injectable({ scope: Scope.REQUEST })
export class AccessTokenProviderService {
  private accessToken?: string;

  constructor(
    @Inject(REQUEST) private request: Request,
    private prismaService: PrismaService,
    private accessTokenEncryptionService: AccessTokenEncryptionService,
  ) {}

  async getAccessToken() {
    if (this.accessToken) return this.accessToken;
    const user = this.request.user as PrismaUser | undefined;

    if (!user || !user?.id) {
      throw new NotFoundException('No user found');
    }

    const account = await this.prismaService.account.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        accessToken: true,
        email: true,
      },
    });

    if (!account) {
      throw new NotFoundException('No account found');
    }

    const accessToken = await this.accessTokenEncryptionService.decrypt(
      account.accessToken,
      account.email,
    );

    this.accessToken = accessToken;

    return accessToken;
  }
}
