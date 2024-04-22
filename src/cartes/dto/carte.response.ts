import { BaseResponse } from '../../../packages';
import { Expose, Type } from 'class-transformer';
import { LampeResponse, StoreResponse } from '../../devices';
import { ConnectedElementResponse } from './connected-element.response';

export class CarteResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbPins!: number;

  @Expose()
  adresseIp!: string;

  @Type(() => LampeResponse)
  @Expose()
  lampes?: LampeResponse[];

  @Type(() => StoreResponse)
  @Expose()
  stores?: StoreResponse[];

  @Type(() => ConnectedElementResponse)
  @Expose()
  connectedElements?: ConnectedElementResponse[];
}
