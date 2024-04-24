import { IsNotEmpty } from 'class-validator';

import { BaseModel, Trim } from '../../../packages';

export class loginUserDto extends BaseModel {
  @IsNotEmpty()
  @Trim()
  username!: string;

  @IsNotEmpty()
  @Trim()
  password!: string;
}
