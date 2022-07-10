import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LoginInput } from './login.input';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Body(ValidationPipe) input: LoginInput) {
    return await this.authService.login(input);
  }

  @Get('/foo/:id')
  async foo(@Param('id') id: string) {
    const test = 'foo';
    return this.jwtService.sign({ sub: test }, {});
  }
}
