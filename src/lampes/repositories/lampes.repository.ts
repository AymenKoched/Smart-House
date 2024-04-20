import { LampeEntity } from '../entities';
import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LampesRepository extends BaseRepository<LampeEntity> {
  entityType = LampeEntity;
}
