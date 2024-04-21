import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';
import { EtageEntity } from './entities';
import { EtagesRepository } from './repositories';

@Injectable()
export class EtagesService extends CrudService<EtageEntity> {
  protected notFoundErrorKey = NotFoundErrors.EtagesNotFound;
  protected notFoundErrorMessage = 'The etages searched is not found';

  constructor(private etagesRepo: EtagesRepository) {
    super(etagesRepo);
  }
}
