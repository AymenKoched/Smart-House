import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class updateCarteDto {
  @IsNotEmpty()
  @Type(() => String)
  adresseIp!: string;
}
