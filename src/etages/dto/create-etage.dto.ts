import { IsNotEmpty, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { CarteEntity } from '../../cartes';
import { LampeEntity } from '../../lampes';
import { StoreEntity } from '../../stores';
import { Trim } from '../../../packages';

export class createEtageDto {
  @IsNotEmpty()
  @Type(() => String)
  @Trim()
  nom!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @Min(0)
  nbChambres!: number;

  @IsOptional()
  @Type(() => CarteEntity)
  cartes: CarteEntity[];

  @IsOptional()
  @Type(() => LampeEntity)
  lampes: LampeEntity[];

  @IsOptional()
  @Type(() => StoreEntity)
  stores: StoreEntity[];
}
