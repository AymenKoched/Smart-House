import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../../packages';
import { StoreEntity } from '../entities';
import { StoresRepository } from '../repositories';
import { CartesService, ConnectedElementEntity, ConnectedElementService } from 'src/cartes';
import { EtagesService } from 'src/etages';
import { CreateStoreDto } from '../dto/create-store.dto';
import { StoreResponse } from '../dto';

@Injectable()
export class StoresService extends CrudService<StoreEntity> {
  protected notFoundErrorKey = NotFoundErrors.StoresNotFound;
  protected notFoundErrorMessage = 'The stores searched is not found';

  constructor(
    private readonly storesRepo: StoresRepository,
    @Inject(forwardRef(() => ConnectedElementService))
    private readonly connectedElementsService: ConnectedElementService,
    @Inject(forwardRef(() => CartesService))
    private readonly cartesService: CartesService,
    @Inject(forwardRef(() => EtagesService))
    private readonly etagesService: EtagesService,
  ) {
    super(storesRepo);
  }
  async createStore(newStore : CreateStoreDto) : Promise<StoreResponse> {
    await this.cartesService.findById(newStore.carteId);
    await this.etagesService.findById(newStore.etageId);
    await this.connectedElementsService.checkPin(
      newStore.pin1,
      newStore.carteId,
    );
    await this.connectedElementsService.checkPin(
      newStore.pin2,
      newStore.carteId,
    );

    const store = await this.create(newStore);

    this.connectedElementsService.addDeviceToPin(
      store.pin1,
      store.carteId,
      store.id,
    );
    
    this.connectedElementsService.addDeviceToPin(
      store.pin2,
      store.carteId,
      store.id,
    );

    return store;
  }

  async deleteStoreById(storeId: string) : Promise<StoreResponse[]>{
    const toBeDeleted = await this.findById(storeId);
    await this.connectedElementsService.removeDeviceFromPin(
      toBeDeleted.pin1,
      toBeDeleted.carteId,
    );
    await this.connectedElementsService.removeDeviceFromPin(
      toBeDeleted.pin2,
      toBeDeleted.carteId,
    );
    return this.deleteById(storeId);

  }
   
}
