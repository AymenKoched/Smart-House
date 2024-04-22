import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../packages';
import { Expose } from 'class-transformer';
import { LampeEntity, StoreEntity } from '../../devices';
import { ConnectedElementEntity } from './connected-element.entity';

@Entity({ name: 'cartes' })
export class CarteEntity extends BaseEntity {
  protected keyPrefix = 'carte_';

  @Column({ length: 100 })
  @Expose()
  @Index({ unique: true, where: `deleted_at is null` })
  nom!: string;

  @Column({ name: 'nb_pins' })
  @Expose()
  nbPins!: number;

  @Column({ name: 'adresse_ip', length: 100 })
  @Expose()
  @Index({ unique: true, where: `deleted_at is null` })
  adresseIp!: string;

  @OneToMany(() => LampeEntity, (lampe) => lampe.carte)
  lampes?: LampeEntity[];

  @OneToMany(() => StoreEntity, (store) => store.carte)
  stores?: StoreEntity[];

  @OneToMany(
    () => ConnectedElementEntity,
    (connectedElement) => connectedElement.carte,
  )
  connectedElements!: ConnectedElementEntity[];
}
