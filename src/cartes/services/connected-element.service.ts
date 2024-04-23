import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { CrudService, NotFoundErrors } from '../../../packages';
import { ConnectedElementRepository } from '../repositories';
import { ConnectedElementEntity } from '../entities';

@Injectable()
export class ConnectedElementService extends CrudService<ConnectedElementEntity> {
  protected notFoundErrorKey = NotFoundErrors.ConnectedElementNotFound;
  protected notFoundErrorMessage =
    'The connected element searched is not found';

  constructor(
    private readonly connectedElementRepo: ConnectedElementRepository,
  ) {
    super(connectedElementRepo);
  }

  async addDeviceToPin(
    pin: number,
    carteId: string,
    deviceId: string,
  ): Promise<UpdateResult> {
    return this.updateByCriteria({ pin, carte: { id: carteId } }, { deviceId });
  }
}
