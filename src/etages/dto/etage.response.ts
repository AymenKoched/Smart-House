import { Expose, Type } from 'class-transformer';

import { BaseResponse } from '../../../packages';
import { LampeResponse, StoreResponse } from '../../devices';

export class EtageResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbChambres!: number;

  @Type(() => LampeResponse)
  @Expose()
  lampes?: LampeResponse[];

  @Type(() => StoreResponse)
  @Expose()
  stores?: StoreResponse[];
}
