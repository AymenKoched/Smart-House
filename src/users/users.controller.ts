import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';

import { ConvertResponse } from '../../packages';

import { UsersService } from './users.service';
import { loginUserDto, updateUserDto, UserResponse } from './dto';
import { JwtAuthGuard } from './guards';
import { User } from './decorators';
import { UserEntity } from './entities';

@Controller({ path: 'user' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @ConvertResponse(UserResponse)
  async logIn(@Body() loginUser: loginUserDto): Promise<UserResponse> {
    return this.usersService.login(loginUser);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  // @ConvertResponse(UserResponse)
  async updatePassword(
    @Body() updateUser: updateUserDto,
    @User() user: UserEntity,
  ) {
    return this.usersService.updatePassword(user.username, updateUser);
  }
}
