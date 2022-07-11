import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './login/login.input';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body(ValidationPipe) input: LoginInput) {
    const jwt = await this.authService.login(input);

    return {
      jwt,
    };
  }
}
