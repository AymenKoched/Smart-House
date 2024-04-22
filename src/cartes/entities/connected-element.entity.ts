import { Column, Entity, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from '../../../packages';
import { DeviceEntity } from '../../devices';

import { CarteEntity } from './carte.entity';

@Entity({ name: 'connected_elements' })
export class ConnectedElementEntity extends BaseEntity {
  protected keyPrefix = 'cnx_element_';

  @Column()
  @Expose()
  pin!: number;

  @ManyToOne(() => DeviceEntity, { nullable: true })
  device!: DeviceEntity;

  @ManyToOne(() => CarteEntity, (carte) => carte.connectedElements)
  carte!: CarteEntity;
}
