/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@users/dto';
import { IUserRepository } from '@users/repository';
import { User } from '@users/schema';

export interface IUserService {
  createUser(createUserDto: CreateUserDto): Promise<User>;
}

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existentUser = await this.userRepository.findUserByUsername(
      createUserDto.username,
    );

    if (existentUser) {
      throw new BadRequestException('User ya existe');
    }

    return await this.userRepository.createUser(createUserDto);
  }
}
