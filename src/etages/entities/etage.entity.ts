import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { LampeEntity, StoreEntity } from '../../devices';

@Entity({ name: 'etages' })
export class EtageEntity extends BaseEntity {
  keyPrefix = 'etage_';

  @Column({ length: 100 })
  @Expose()
  @Index({ unique: true, where: `deleted_at is null` })
  nom!: string;

  @Column({ name: 'nb_chambres' })
  @Expose()
  nbChambres!: number;

  @OneToMany(() => LampeEntity, (lampe) => lampe.etage)
  lampes?: LampeEntity[];

  @OneToMany(() => StoreEntity, (store) => store.etage)
  stores?: StoreEntity[];
}
