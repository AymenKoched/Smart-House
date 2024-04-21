import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class updateEtageDto {
  @IsNotEmpty()
  @Type(() => Number)
  nbChambres!: number;
}
