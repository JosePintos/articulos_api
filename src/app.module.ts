/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticulosModule } from './articulos/articulos.module';
import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigModule) => ({
        uri: (configService as any).get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ArticulosModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
