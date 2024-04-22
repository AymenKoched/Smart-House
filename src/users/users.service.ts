import { Injectable } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../packages';

@Injectable()
export class UsersService extends CrudService {
  protected notFoundErrorKey = NotFoundErrors.UsersNotFound;
  protected notFoundErrorMessage = 'The users searched is not found';
}
