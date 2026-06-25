import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.email, body.password);
  }
  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body.email, body.password);
  }
  @Get('users')
  getUsers() {
    return this.authService.getUsers();
  }
}
