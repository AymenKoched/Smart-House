import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { LampeEntity, StoreEntity } from '../../devices';

@Entity({ name: 'cartes' })
export class CarteEntity extends BaseEntity {
  protected keyPrefix = 'carte_';

  @Column({ unique: true, length: 100 })
  @Expose()
  nom!: string;

  @Column({ name: 'nb_pins' })
  @Expose()
  nbPins!: number;

  @Column({ name: 'adresse_ip', unique: true, length: 100 })
  @Expose()
  adresseIp!: string;

  @OneToMany(() => LampeEntity, (lampe) => lampe.carte)
  lampes?: LampeEntity[];

  @OneToMany(() => StoreEntity, (store) => store.carte)
  stores?: StoreEntity[];
}
