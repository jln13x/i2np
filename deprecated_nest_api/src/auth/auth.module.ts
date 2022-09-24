import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from 'account/account.module';
import { NotionModule } from 'notion/notion.module';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'user/user.module';
import { AccessTokenEncryptionService } from './access-token-encryption.service';
import { AccessTokenProviderService } from './access-token-provider.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtSecret } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: jwtSecret,
    }),
    forwardRef(() => UserModule),
    forwardRef(() => NotionModule),
    AccountModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AccessTokenEncryptionService,
    AccessTokenProviderService,
  ],
  exports: [AccessTokenEncryptionService, AccessTokenProviderService],
})
export class AuthModule {}
