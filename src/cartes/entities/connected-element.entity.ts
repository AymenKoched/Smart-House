import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from '../../../packages';

import { CarteEntity } from './carte.entity';

@Entity({ name: 'connected_elements' })
@Index(['pin', 'carte'], { unique: true })
export class ConnectedElementEntity extends BaseEntity {
  protected keyPrefix = 'cnx_element_';

  @Column()
  @Expose()
  pin!: number;

  @Column({ nullable: true })
  @Expose()
  deviceId?: string;

  @ManyToOne(() => CarteEntity, (carte) => carte.connectedElements)
  carte!: CarteEntity;
}
