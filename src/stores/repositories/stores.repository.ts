import { StoreEntity } from '../entities';
import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StoresRepository extends BaseRepository<StoreEntity> {
  entityType = StoreEntity;
}
