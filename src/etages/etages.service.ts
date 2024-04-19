import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';

@Injectable()
export class EtagesService extends CrudService {
  protected notFoundErrorKey = NotFoundErrors.EtagesNotFound;
  protected notFoundErrorMessage = 'The etages searched is not found';
}
