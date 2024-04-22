import { BaseModel } from '../../../packages';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { DeviceEntity } from '../../devices';

export class updateConnectedElementDto extends BaseModel {
  @IsNotEmpty()
  @Type(() => DeviceEntity)
  device!: DeviceEntity | null;
}