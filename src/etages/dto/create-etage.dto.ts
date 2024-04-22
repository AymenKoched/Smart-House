import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel, Trim } from '../../../packages';
import { LampeEntity, StoreEntity } from '../../devices';

export class createEtageDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  @Trim()
  nom!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  nbChambres!: number;

  @IsOptional()
  @Type(() => LampeEntity)
  lampes: LampeEntity[];

  @IsOptional()
  @Type(() => StoreEntity)
  stores: StoreEntity[];
}
