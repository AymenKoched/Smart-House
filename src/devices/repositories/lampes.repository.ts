import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';
import { LampeEntity } from '../entities';

@Injectable()
export class LampesRepository extends BaseRepository<LampeEntity> {
  entityType = LampeEntity;
}
