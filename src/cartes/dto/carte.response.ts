import { BaseResponse } from '../../../packages';
import { Expose } from 'class-transformer';

export class CarteResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbPins!: number;

  @Expose()
  adresseIp!: string;
}
