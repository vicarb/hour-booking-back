// src/auth/auth.service.ts

import { Injectable, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    console.log('User from database:', user);
    if (user) {
      const isPasswordMatching = await bcrypt.compare(pass, user.password);
      if (isPasswordMatching) {
        const userResponse = {
          _id: user._id,
          username: user.username,
          // Include any other user data you want to return
        };
        console.log('User to return:', userResponse);
        return userResponse;
      }
    }
    return null;
  }
  
  

  async login(user: any) {
    console.log(user);
    
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
      user: { // Add this line
        username: user.username,
        // Include any other user details you want to send back
      },
    };
  }
  

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.usersService.findOne(createUserDto.username);
    if (userExists) {
      throw new ConflictException('Username already exists');
    }
    const user = await this.usersService.create(createUserDto);
    return { message: 'User registered successfully' };
  }
}
