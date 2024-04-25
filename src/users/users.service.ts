import * as process from 'process';

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CrudService, NotFoundErrors } from '../../packages';

import { UserEntity } from './entities';
import { UsersRepository } from './repositories';
import { loginUserDto, updateUserDto, UserResponse } from './dto';

@Injectable()
export class UsersService extends CrudService<UserEntity> {
  protected notFoundErrorKey = NotFoundErrors.UsersNotFound;
  protected notFoundErrorMessage = 'The users searched is not found';

  constructor(
    private readonly userRepo: UsersRepository,
    private readonly jwtService: JwtService,
  ) {
    super(userRepo);
  }

  async login(loginUser: loginUserDto): Promise<UserResponse> {
    const user = await this.userRepo.repo.findOneBy({
      username: loginUser.username,
    });

    if (user) {
      const auth = user.password === loginUser.password;
      if (auth) {
        const token = this.jwtService.sign(
          { id: user.id, username: user.username },
          {
            secret: process.env.JWT_SECRET,
          },
        );
        return new UserResponse({ username: user.username, token });
      }
      const error = {
        message: 'incorrect password',
        error: 'Bad Request',
        statusCode: 400,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    const error = {
      message: 'incorrect username',
      error: 'Bad Request',
      statusCode: 400,
    };
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }

  async updatePassword(username: string, updateUser: updateUserDto) {
    const user = await this.userRepo.repo.findOneBy({ username });
    if (user.password !== updateUser.oldPassword) {
      const error = {
        message: 'incorrect oldPassword',
        error: 'Bad Request',
        statusCode: 400,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
    return this.updateById(user.id, { password: updateUser.password });
  }
}
