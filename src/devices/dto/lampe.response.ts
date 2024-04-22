import { Expose, Type } from 'class-transformer';

import { BaseResponse } from '../../../packages';
import { CarteResponse } from '../../cartes';
import { EtageResponse } from '../../etages';

export class LampeResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  pin!: number;

  @Type(() => CarteResponse)
  @Expose()
  carte!: CarteResponse;

  @Type(() => EtageResponse)
  @Expose()
  etage!: EtageResponse;
}
