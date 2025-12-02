import { Injectable, BadRequestException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(email: string, password: string) {
    const existing = await this.userModel.findOne({ email });
    if (existing) {
      throw new Error('Email đã được sử dụng');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({ email, password: hashedPassword });
    return newUser.save();
  }

  // user.service.ts
async login(data: any) {
  const { email, password } = data;
  const user = await this.userModel.findOne({ email });
  if (!user) throw new BadRequestException('Email không tồn tại');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new BadRequestException('Password sai');

  return { message: 'Login thành công', email: user.email };
}

}
