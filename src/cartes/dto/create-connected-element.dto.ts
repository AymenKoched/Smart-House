import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

import { BaseModel } from '../../../packages';
import { DeviceEntity } from '../../devices';
import { CarteEntity } from '../entities';

export class createConnectedElementDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => String)
  pin!: number;

  @IsNotEmpty()
  @Type(() => DeviceEntity)
  device!: DeviceEntity | null;

  @IsNotEmpty()
  @Type(() => CarteEntity)
  carte!: CarteEntity;
}
