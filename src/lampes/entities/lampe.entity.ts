import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { CarteEntity } from '../../cartes';
import { EtageEntity } from '../../etages';

@Entity({ name: 'lampes' })
@Index(['nom', 'etage'], { unique: true })
@Index(['nom', 'carte'], { unique: true })
export class LampeEntity extends BaseEntity {
  protected keyPrefix = 'lampe_';

  @Column({ length: 100 })
  @Expose()
  nom!: string;

  @Column()
  @Expose()
  pin!: number;

  @ManyToOne(() => CarteEntity, (carte) => carte.lampes)
  carte!: CarteEntity;

  @ManyToOne(() => EtageEntity, (etage) => etage.lampes)
  etage!: EtageEntity;
}
