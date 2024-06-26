import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column()
  @Expose()
  carteId!: string;

  @ManyToOne(() => CarteEntity)
  @JoinColumn({ name: 'carteId' })
  carte!: CarteEntity;

  @Column()
  @Expose()
  etageId!: string;

  @ManyToOne(() => EtageEntity)
  @JoinColumn({ name: 'etageId' })
  etage!: EtageEntity;
}
