import { Expose } from 'class-transformer';

import { BaseModel } from './base.model';

export class BaseResponse extends BaseModel {
  @Expose()
  id!: string;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}
