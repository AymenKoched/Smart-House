import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel } from '../../../packages';
import { CarteEntity } from '../entities';

export class createConnectedElementDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  pin!: number;

  @IsOptional()
  deviceId?: string;

  @IsNotEmpty()
  @Type(() => CarteEntity)
  carte!: CarteEntity;
}
