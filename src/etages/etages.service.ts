import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { map } from 'lodash';

import { CrudService, NotFoundErrors } from '../../packages';
import { LampesService, StoresService } from '../devices';

import { EtageEntity } from './entities';
import { EtagesRepository } from './repositories';
import { EtageResponse } from './dto';

@Injectable()
export class EtagesService extends CrudService<EtageEntity> {
  protected notFoundErrorKey = NotFoundErrors.EtagesNotFound;
  protected notFoundErrorMessage = 'The etages searched is not found';

  constructor(
    private readonly etagesRepo: EtagesRepository,
    @Inject(forwardRef(() => LampesService))
    private readonly lampesService: LampesService,
    @Inject(forwardRef(() => StoresService))
    private readonly storesService: StoresService,
  ) {
    super(etagesRepo);
  }

  async deleteEtage(id: string): Promise<EtageResponse[]> {
    const toBeDeletedEtage = await this.findById(id, ['lampes', 'stores']);

    const toBeDeletedLampes = map(toBeDeletedEtage.lampes, (lampe) => lampe.id);
    const toBeDeletedStores = map(toBeDeletedEtage.stores, (store) => store.id);

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

    return await this.deleteById(id);
  }
}
