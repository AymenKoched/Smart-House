import { Injectable } from '@nestjs/common';

import { BaseRepository } from '../../../packages';
import { UserEntity } from '../entities';

@Injectable()
export class UsersRepository extends BaseRepository<UserEntity> {
  entityType = UserEntity;
}
