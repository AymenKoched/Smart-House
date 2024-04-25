import { IsNotEmpty, MinLength } from 'class-validator';

import { BaseModel, Trim } from '../../../packages';

export class updateUserDto extends BaseModel {
  @IsNotEmpty()
  @Trim()
  oldPassword!: string;

  @IsNotEmpty()
  @Trim()
  @MinLength(8, { message: 'password must be at least 8 characters' })
  password!: string;
}
