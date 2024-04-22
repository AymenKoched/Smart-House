import { Injectable } from '@nestjs/common';
import { map } from 'lodash';

import { CrudService, NotFoundErrors } from '../../../packages';
import { CarteEntity } from '../entities';
import { CartesRepository } from '../repositories';
import {
  CarteResponse,
  createCarteDto,
  createConnectedElementDto,
} from '../dto';
import { LampesService } from '../../devices';

import { ConnectedElementService } from './connected-element.service';

@Injectable()
export class CartesService extends CrudService<CarteEntity> {
  protected notFoundErrorKey = NotFoundErrors.CartesNotFound;
  protected notFoundErrorMessage = 'The cartes searched is not found';

  constructor(
    private readonly carteRepo: CartesRepository,
    private readonly lampesService: LampesService,
    private readonly connectedElementsService: ConnectedElementService,
  ) {
    super(carteRepo);
  }

  async createCarte(newCarte: createCarteDto): Promise<CarteResponse> {
    const carte = await this.create(newCarte);
    for (let i = 0; i < carte.nbPins; i++) {
      await this.connectedElementsService.create(
        new createConnectedElementDto({
          pin: i,
          device: null,
          carte,
        }),
      );
    }
    return carte;
  }

  async deleteCarte(id: string): Promise<CarteResponse[]> {
    const toBeDeletedCarte = await this.findById(id, ['lampes', 'stores']);

    const toBeDeletedLampes = map(toBeDeletedCarte.lampes, (lampe) => lampe.id);
    console.log({ toBeDeletedLampes });

    await Promise.all(
      map(toBeDeletedLampes, (lampeId) =>
        this.lampesService.deleteById(lampeId),
      ),
    );

    return await this.deleteById(id);
  }
}
