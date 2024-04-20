import { EtageEntity } from '../entities';
import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EtagesRepository extends BaseRepository<EtageEntity> {
  entityType = EtageEntity;
}
