import { Expose, Type } from 'class-transformer';
import { BaseResponse } from '../../../packages';
import { LampeEntity, StoreEntity } from '../../devices';

export class EtageResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbChambres!: number;

  @Type(() => LampeEntity)
  @Expose()
  lampes?: LampeEntity[];

  @Type(() => StoreEntity)
  @Expose()
  stores?: StoreEntity[];
}
