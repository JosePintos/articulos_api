import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ access_token: string }> {
    const jwtPayload = await this.authService.validateUser(
      body.username,
      body.password,
    );
    return this.authService.login(jwtPayload);
  }
}
