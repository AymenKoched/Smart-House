import { Expose } from 'class-transformer';
import { BaseResponse } from '../../../packages';

export class EtageResponse extends BaseResponse {
  @Expose()
  nom!: string;

  @Expose()
  nbChambres!: number;
}
