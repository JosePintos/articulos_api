/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '@users/dto';
import { User } from '@users/schema';
import { Model } from 'mongoose';

export interface IUserRepository {
  createUser(createUserDto: CreateUserDto): Promise<User>;
  findUserByUsername(username: string): Promise<User | null>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return new this.userModel(createUserDto).save();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
