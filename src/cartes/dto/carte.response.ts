import { BaseResponse } from '../../../packages';
import { Expose, Type } from 'class-transformer';
import { LampeEntity, StoreEntity } from '../../devices';

export class CarteResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbPins!: number;

  @Expose()
  adresseIp!: string;

  @Type(() => LampeEntity)
  @Expose()
  lampes?: LampeEntity[];

  @Type(() => StoreEntity)
  @Expose()
  stores?: StoreEntity[];
}
