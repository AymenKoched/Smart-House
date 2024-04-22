import { Injectable } from '@nestjs/common';

import { EtageEntity } from '../entities';
import { BaseRepository } from '../../../packages';

@Injectable()
export class EtagesRepository extends BaseRepository<EtageEntity> {
  entityType = EtageEntity;
}
