import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';
import { StoreEntity } from '../entities';

@Injectable()
export class StoresRepository extends BaseRepository<StoreEntity> {
  entityType = StoreEntity;
}
