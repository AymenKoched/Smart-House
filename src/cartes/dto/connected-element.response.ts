import { Expose } from 'class-transformer';

import { BaseResponse } from '../../../packages';

export class ConnectedElementResponse extends BaseResponse {
  @Expose()
  pin!: number;

  @Expose()
  deviceId?: string;
}
