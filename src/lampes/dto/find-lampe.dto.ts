import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

export class findLampeDto {
  @IsOptional()
  @Type(() => String)
  nom: string;

  @IsOptional()
  @Type(() => Number)
  pin: number;

  @IsOptional()
  @Type(() => CarteEntity)
  carte: CarteEntity;

  @IsOptional()
  @Type(() => EtageEntity)
  etage: EtageEntity;
}
