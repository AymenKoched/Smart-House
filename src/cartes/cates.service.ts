import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';
import { CarteEntity } from './entities';
import { CartesRepository } from './repositories';

@Injectable()
export class CartesService extends CrudService<CarteEntity> {
  protected notFoundErrorKey = NotFoundErrors.CartesNotFound;
  protected notFoundErrorMessage = 'The cartes searched is not found';

  constructor(private carteRepo: CartesRepository) {
    super(carteRepo);
  }
}
