import { IsOptional } from 'class-validator';

import { BaseModel } from '../../../packages';

export class updateConnectedElementDto extends BaseModel {
  @IsOptional()
  deviceId?: string;
}
