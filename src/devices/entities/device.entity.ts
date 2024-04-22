import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Expose } from 'class-transformer';

import { BaseEntity } from '../../../packages';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

@Entity({ name: 'device' })
@Index(['nom', 'etage'], { unique: true })
@Index(['nom', 'carte'], { unique: true })
export abstract class DeviceEntity extends BaseEntity {
  @Column({ length: 100 })
  @Expose()
  nom!: string;

  @ManyToOne(() => CarteEntity, (carte) => carte.lampes)
  carte!: CarteEntity;

  @ManyToOne(() => EtageEntity, (etage) => etage.lampes)
  etage!: EtageEntity;
}
