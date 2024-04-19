import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';

@Injectable()
export class CartesService extends CrudService {
  protected notFoundErrorKey = NotFoundErrors.CartesNotFound;
  protected notFoundErrorMessage = 'The cartes searched is not found';
}
