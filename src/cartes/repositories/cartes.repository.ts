import { CarteEntity } from '../entities';
import { BaseRepository } from '../../../packages';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CartesRepository extends BaseRepository<CarteEntity> {
  entityType = CarteEntity;
}
