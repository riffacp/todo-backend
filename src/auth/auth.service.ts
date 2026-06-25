import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    private jwtService: JwtService,
  ) {}
  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }
  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      return { message: 'User not found' };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return { message: 'Invalid password' };
    }

    console.log('LOGIN USER ID:', user.id);
    console.log('LOGIN EMAIL:', user.email);

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    console.log('TOKEN GENERATED:', token);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
  async getUsers() {
    return this.userRepository.find();
  }
}
