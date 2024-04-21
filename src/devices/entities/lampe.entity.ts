import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { DeviceEntity } from './device.entity';

@Entity({ name: 'lampes' })
export class LampeEntity extends DeviceEntity {
  protected keyPrefix = 'lampe_';

  @Column()
  @Expose()
  pin!: number;
}
