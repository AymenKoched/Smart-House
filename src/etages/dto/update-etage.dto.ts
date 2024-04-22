import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel } from '../../../packages';

export class updateEtageDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => Number)
  nbChambres!: number;
}
