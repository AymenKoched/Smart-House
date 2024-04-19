import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';

@Injectable()
export class LampesService extends CrudService {
  protected notFoundErrorKey = NotFoundErrors.LampesNotFound;
  protected notFoundErrorMessage = 'The lampes searched is not found';
}
