import { Injectable } from '@nestjs/common';

import { CarteEntity } from '../entities';
import { BaseRepository } from '../../../packages';

@Injectable()
export class CartesRepository extends BaseRepository<CarteEntity> {
  entityType = CarteEntity;
}
