import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Min } from 'class-validator';
import { Expose } from 'class-transformer';
import { EtageEntity } from '../../etages';
import { LampeEntity } from '../../lampes';
import { StoreEntity } from '../../stores';

@Entity({ name: 'cartes' })
export class CarteEntity extends BaseEntity {
  protected keyPrefix = 'carte_';

  @Column({ unique: true, length: 100 })
  @Expose()
  nom!: string;

  @Column({ name: 'nb_pins' })
  @Min(0)
  @Expose()
  nbPins!: number;

  @Column({ name: 'adresse_ip', unique: true, length: 100 })
  @Expose()
  adresseIp!: string;

  @ManyToOne(() => EtageEntity, (etage) => etage.cartes)
  etage!: EtageEntity;

  @OneToMany(() => LampeEntity, (lampe) => lampe.carte)
  lampes?: LampeEntity[];

  @OneToMany(() => StoreEntity, (store) => store.carte)
  stores?: StoreEntity[];
}
