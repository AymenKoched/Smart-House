import { Expose } from 'class-transformer';

import { BaseResponse } from '../../../packages';
import { DeviceEntity } from '../../devices';

export class ConnectedElementResponse extends BaseResponse {
  @Expose()
  pin!: number;

  @Expose()
  device!: DeviceEntity;
}
