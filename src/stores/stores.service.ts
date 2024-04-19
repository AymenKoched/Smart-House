import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';

@Injectable()
export class StoresService extends CrudService {
  protected notFoundErrorKey = NotFoundErrors.StoresNotFound;
  protected notFoundErrorMessage = 'The stores searched is not found';
}
