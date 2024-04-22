import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../../packages';
import { StoreEntity } from '../entities';

@Injectable()
export class StoresRepository extends BaseRepository<StoreEntity> {
  entityType = StoreEntity;
}
