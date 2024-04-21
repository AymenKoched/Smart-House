import { BaseModel, Trim } from '../../../packages';
import { Type } from 'class-transformer';
import { LampeEntity } from '../../lampes';
import { StoreEntity } from '../../stores';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

export class createCarteDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  @Trim()
  nom!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  nbPins!: number;

  @IsNotEmpty()
  @Type(() => String)
  @Trim()
  adresseIp!: string;

  @IsOptional()
  @Type(() => LampeEntity)
  lampes?: LampeEntity[];

  @IsOptional()
  @Type(() => StoreEntity)
  stores?: StoreEntity[];
}
