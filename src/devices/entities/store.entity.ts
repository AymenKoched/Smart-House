import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'stores' })
export class StoreEntity extends DeviceEntity {
  protected keyPrefix = 'store_';

  @Column({ name: 'pin_1' })
  @Expose()
  pin1!: number;

  @Column({ name: 'pin_2' })
  @Expose()
  pin2!: number;
}
