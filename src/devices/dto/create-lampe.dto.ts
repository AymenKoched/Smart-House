import { IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel, Trim } from '../../../packages';

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
  carteId!: string;

  @IsNotEmpty()
  etageId!: string;
}
