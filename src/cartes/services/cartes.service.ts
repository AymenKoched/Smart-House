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
import { LampesService, StoresService } from '../../devices';

import { ConnectedElementService } from './connected-element.service';

@Injectable()
export class CartesService extends CrudService<CarteEntity> {
  protected notFoundErrorKey = NotFoundErrors.CartesNotFound;
  protected notFoundErrorMessage = 'The cartes searched is not found';

  constructor(
    private readonly carteRepo: CartesRepository,
    private readonly lampesService: LampesService,
    private readonly storesService: StoresService,
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
          carte,
        }),
      );
    }
    return carte;
  }

  async deleteCarte(id: string): Promise<CarteResponse[]> {
    const toBeDeletedCarte = await this.findById(id, [
      'lampes',
      'stores',
      'connectedElements',
    ]);

    const toBeDeletedLampes = map(toBeDeletedCarte.lampes, (lampe) => lampe.id);
    const toBeDeletedStores = map(toBeDeletedCarte.stores, (store) => store.id);
    const toBeDeletedConnectedElements = map(
      toBeDeletedCarte.connectedElements,
      (element) => element.id,
    );

    await Promise.all(
      map(toBeDeletedLampes, (lampeId) =>
        this.lampesService.deleteLampeById(lampeId),
      ),
    );

    await Promise.all(
      map(toBeDeletedStores, (storeId) =>
        this.storesService.deleteStoreById(storeId),
      ),
    );

    await Promise.all(
      map(toBeDeletedConnectedElements, (elementId) =>
        this.connectedElementsService.deleteById(elementId),
      ),
    );

    return await this.deleteById(id);
  }
}
