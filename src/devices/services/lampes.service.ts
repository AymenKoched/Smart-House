import { Injectable } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../../packages';
import { LampesRepository } from '../repositories';
import { LampeEntity } from '../entities';

@Injectable()
export class LampesService extends CrudService<LampeEntity> {
  protected notFoundErrorKey = NotFoundErrors.LampesNotFound;
  protected notFoundErrorMessage = 'The lampes searched is not found';

  constructor(private readonly lampesRepo: LampesRepository) {
    super(lampesRepo);
  }
}
