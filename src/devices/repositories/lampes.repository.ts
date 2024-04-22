import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../../packages';
import { LampeEntity } from '../entities';

@Injectable()
export class LampesRepository extends BaseRepository<LampeEntity> {
  entityType = LampeEntity;
}
