import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { getMongoConfig } from './config.mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { getJWTConfig } from './jwt.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'envs/.account.env',
    }),
    MongooseModule.forRootAsync(getMongoConfig()),
    JwtModule.registerAsync(getJWTConfig()),
  ],
  exports: [NestConfigModule, MongooseModule, JwtModule],
})
export class ConfigModule {}
