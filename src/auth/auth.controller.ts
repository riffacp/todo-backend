import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Get } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() body: RegisterDto) {
    console.log('REGISTER BODY:', body);

    return {
      success: true,
      body,
    };
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
