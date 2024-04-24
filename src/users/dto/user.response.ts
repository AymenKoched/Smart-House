import { Expose } from 'class-transformer';

import { BaseResponse } from '../../../packages';

export class UserResponse extends BaseResponse {
  @Expose()
  username!: string;

  @Expose()
  token!: string;
}
