import { BaseResponse } from '../../../packages';
import { Expose, Type } from 'class-transformer';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

export class LampeResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  pin!: number;

  @Type(() => CarteEntity)
  @Expose()
  carte!: CarteEntity;

  @Type(() => EtageEntity)
  @Expose()
  etage!: EtageEntity;
}
