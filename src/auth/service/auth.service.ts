/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RolesEnum } from '@shared/const';
import { NotFoundDomainException } from '@shared/exception';
import { Role } from '@shared/model';
import { User } from '@users/schema/user.schema';
import { Model } from 'mongoose';

export type JwtPayload = {
  sub: string;
  role: Role;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<JwtPayload> {
    const user = await this.userModel.findOne({ username, password }).exec();

    if (!user) {
      throw new NotFoundDomainException('Usuario');
    }

    const jwtPayload: JwtPayload = {
      sub: user._id as string,
      role: RolesEnum[user.role],
    };

    return jwtPayload;
  }

  async login(jwtPayload: JwtPayload) {
    return {
      access_token: this.jwtService.sign(jwtPayload),
    };
  }
}
