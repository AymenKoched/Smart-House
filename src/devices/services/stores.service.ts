import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../../packages';
import { StoreEntity } from '../entities';
import { StoresRepository } from '../repositories';

@Injectable()
export class StoresService extends CrudService<StoreEntity> {
  protected notFoundErrorKey = NotFoundErrors.StoresNotFound;
  protected notFoundErrorMessage = 'The stores searched is not found';

  constructor(private storesRepo: StoresRepository) {
    super(storesRepo);
  }
}
