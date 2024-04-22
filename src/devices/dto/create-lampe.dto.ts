import { IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel, Trim } from '../../../packages';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

export class CreateLampeDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  @Trim()
  nom!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  pin!: number;

  @IsNotEmpty()
  @Type(() => CarteEntity)
  carte: CarteEntity;

  @IsNotEmpty()
  @Type(() => EtageEntity)
  etage: EtageEntity;
}
