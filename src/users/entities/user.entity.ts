import { Column, Entity, Index } from 'typeorm';

import { BaseEntity } from '../../../packages';

@Entity('users')
export class UserEntity extends BaseEntity {
  keyPrefix = 'user_';

  @Column({
    length: 100,
  })
  @Index({ unique: true, where: `deleted_at is null` })
  username!: string;

  @Column()
  password!: string;
}
