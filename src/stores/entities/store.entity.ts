import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

@Entity({ name: 'stores' })
@Index(['nom', 'etage'], { unique: true })
@Index(['nom', 'carte'], { unique: true })
export class StoreEntity extends BaseEntity {
  protected keyPrefix = 'store_';

  @Column({ length: 100 })
  @Expose()
  nom!: string;

  @Column({ name: 'pin_1' })
  @Expose()
  pin1!: number;

  @Column({ name: 'pin_2' })
  @Expose()
  pin2!: number;

  @ManyToOne(() => CarteEntity, (carte) => carte.stores)
  carte!: CarteEntity;

  @ManyToOne(() => EtageEntity, (etage) => etage.stores)
  etage!: EtageEntity;
}
