import * as process from 'process';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '../entities';

export interface PayloadJwtTokenInterface {
  id: string;
  username: string;
}

export class PassportJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: PayloadJwtTokenInterface) {
    const user = await this.userRepository.findOneBy({ id: payload.id });

    if (user) {
      delete user.password;
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}
