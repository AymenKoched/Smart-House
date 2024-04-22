import { Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { DeviceEntity } from '../../devices';
import { CarteEntity } from './carte.entity';

@Entity({ name: 'connected_elements' })
export class ConnectedElementEntity extends BaseEntity {
  protected keyPrefix = 'cnx_element_';

  @Expose()
  pin!: number;

  @Expose()
  device!: DeviceEntity | null;

  @ManyToOne(() => CarteEntity, (carte) => carte.connectedElements)
  carte!: CarteEntity;
}
