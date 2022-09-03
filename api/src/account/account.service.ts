import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User as PrismaUser } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class AccountService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prismaService: PrismaService,
  ) {}

  async getAccount() {
    const user = this.request.user as PrismaUser | undefined;

    if (!user || !user?.id) {
      throw new NotFoundException('No user found');
    }

    const account = await this.prismaService.account.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!account) {
      throw new NotFoundException('No account found');
    }

    return account;
  }
}
