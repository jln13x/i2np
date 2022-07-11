import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NotionService } from 'notion/notion.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from 'user/user.module';
import { AccessTokenEncryptionService } from './access-token-encryption.service';
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
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    AccessTokenEncryptionService,
    NotionService,
  ],
  exports: [AccessTokenEncryptionService],
})
export class AuthModule {}
