import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../../packages';
import { LampesRepository } from '../repositories';
import { LampeEntity } from '../entities';
import { ConnectedElementService } from '../../cartes';
import { CreateLampeDto, LampeResponse } from '../dto';

@Injectable()
export class LampesService extends CrudService<LampeEntity> {
  protected notFoundErrorKey = NotFoundErrors.LampesNotFound;
  protected notFoundErrorMessage = 'The lampes searched is not found';

  constructor(
    private readonly lampesRepo: LampesRepository,
    @Inject(forwardRef(() => ConnectedElementService))
    private readonly connectedElementsService: ConnectedElementService,
  ) {
    super(lampesRepo);
  }

  async createLampe(newLampe: CreateLampeDto): Promise<LampeResponse> {
    await this.connectedElementsService.checkPin(
      newLampe.pin,
      newLampe.carteId,
    );
    const lampe = await this.create(newLampe);
    await this.connectedElementsService.addDeviceToPin(
      lampe.pin,
      lampe.carteId,
      lampe.id,
    );

    return lampe;
  }

  async deleteLampeById(id: string): Promise<LampeResponse[]> {
    const toBeDeleted = await this.findById(id);
    console.log('delete lampe  carteId', toBeDeleted.carteId);
    await this.connectedElementsService.removeDeviceFromPin(
      toBeDeleted.pin,
      toBeDeleted.carteId,
    );

    return this.deleteById(id);
  }
}
