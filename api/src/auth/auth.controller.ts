import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LoginRequest } from './login/login.request';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublic()
  @Post('/login')
  async login(@Body(ValidationPipe) input: LoginRequest) {
    return await this.authService.login(input);
  }
}
