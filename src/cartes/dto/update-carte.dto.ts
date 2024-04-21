import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '../../../packages';

export class updateCarteDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  adresseIp!: string;
}
