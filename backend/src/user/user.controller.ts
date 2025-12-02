import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    
    if (!email || !password) {
      throw new HttpException('Email và password là bắt buộc', HttpStatus.BAD_REQUEST);
    }
    
    const user = await this.userService.register(email, password);

    return { 
      success: true, 
      user: { 
        email: user.email 
      } 
    };
  }
}