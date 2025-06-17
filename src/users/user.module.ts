import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema';
import { UserController } from './controller';
import { UserService } from './service';
import { UserRepository } from './repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    { provide: 'IUserRepository', useClass: UserRepository },
  ],
  exports: ['IUserRepository'],
})
export class UserModule {}
