import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      return { success: false, message: 'Email và password là bắt buộc' };
    }

    try {
      const user = await this.userService.register(email, password);
      return { success: true, user: { email: user.email, createdAt: user.createdAt } };
    } catch (err: any) {
      return { success: false, message: err.message };
    }
  }

  // user.controller.ts
  @Post('login')
  async login(@Body() body: any) {
    return this.userService.login(body);
  }

}
