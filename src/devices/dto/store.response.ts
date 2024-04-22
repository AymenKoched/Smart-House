import { Expose, Type } from 'class-transformer';

import { BaseResponse } from '../../../packages';
import { CarteResponse } from '../../cartes';
import { EtageResponse } from '../../etages';

export class StoreResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  pin1!: number;

  @Expose()
  pin2!: number;

  @Type(() => CarteResponse)
  @Expose()
  carte!: CarteResponse;

  @Type(() => EtageResponse)
  @Expose()
  etage!: EtageResponse;
}
