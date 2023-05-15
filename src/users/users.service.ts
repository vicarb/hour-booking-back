// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto'; // add this line
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  async create(createUserDto: CreateUserDto): Promise<User> { // update this line
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // update this line
    const newUser = new this.userModel({ 
      username: createUserDto.username, // update this line
      password: hashedPassword 
    });
    return newUser.save();
  }
}
