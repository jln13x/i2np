import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AccessTokenEncryptionService } from 'auth/access-token-encryption.service';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private accessTokenEncryptionService: AccessTokenEncryptionService,
  ) {}

  async getNotionAccessToken(user: User) {
    const account = await this.prismaService.account.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        accessToken: true,
        email: true,
      },
    });

    console.log(account);

    if (!account) {
      throw new NotFoundException('No account not found');
    }

    return await this.accessTokenEncryptionService.decrypt(
      account.accessToken,
      account.email,
    );
  }
}
