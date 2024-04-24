import * as process from 'process';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEntity } from './entities';
import { UsersRepository } from './repositories';
import { PassportJwtStrategy } from './strategy';

const jwtMaxAge = 2 * 24 * 60 * 60;

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: jwtMaxAge,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersRepository, UsersService, PassportJwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
