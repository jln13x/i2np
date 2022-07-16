import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EVENTS, jwtSecret } from '../constants';
import { JwtPayload } from 'auth/types/jwt-payload.type';
import { PrismaService } from 'prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { LoginSuccessEvent } from 'auth/events/LoginSuccessEvent';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    private prismaService: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: payload.sub,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    this.eventEmitter.emit(EVENTS.LOGIN_SUCCESS, new LoginSuccessEvent(user));

    return user;
  }
}
