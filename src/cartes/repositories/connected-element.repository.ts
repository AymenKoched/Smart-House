import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../../packages';
import { ConnectedElementEntity } from '../entities';

@Injectable()
export class ConnectedElementRepository extends BaseRepository<ConnectedElementEntity> {
  entityType = ConnectedElementEntity;
}
