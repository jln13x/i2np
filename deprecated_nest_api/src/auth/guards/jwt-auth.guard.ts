import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { DECORATORS } from '../constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-strategy') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      DECORATORS.IS_PUBLIC.key,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    const canActive = await super.canActivate(context);

    return !!canActive;
  }
}
