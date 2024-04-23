import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from '../../../packages';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

@Entity({ name: 'device' })
@Index(['nom', 'etage'], { unique: true, where: `deleted_at is null` })
@Index(['nom', 'carte'], { unique: true, where: `deleted_at is null` })
export abstract class DeviceEntity extends BaseEntity {
  @Column({ length: 100 })
  @Expose()
  nom!: string;

  @ManyToOne(() => CarteEntity)
  carte!: CarteEntity;

  @ManyToOne(() => EtageEntity)
  etage!: EtageEntity;
}
