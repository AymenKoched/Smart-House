import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../../packages';
import { LampesRepository } from '../repositories';
import { LampeEntity } from '../entities';
import { CartesService, ConnectedElementService } from '../../cartes';
import { CreateLampeDto, LampeResponse } from '../dto';
import { EtagesService } from '../../etages';

@Injectable()
export class LampesService extends CrudService<LampeEntity> {
  protected notFoundErrorKey = NotFoundErrors.LampesNotFound;
  protected notFoundErrorMessage = 'The lampes searched is not found';

  constructor(
    private readonly lampesRepo: LampesRepository,
    @Inject(forwardRef(() => ConnectedElementService))
    private readonly connectedElementsService: ConnectedElementService,
    @Inject(forwardRef(() => CartesService))
    private readonly cartesService: CartesService,
    @Inject(forwardRef(() => EtagesService))
    private readonly etagesService: EtagesService,
  ) {
    super(lampesRepo);
  }

  async createLampe(newLampe: CreateLampeDto): Promise<LampeResponse> {
    await this.cartesService.findById(newLampe.carteId);
    await this.etagesService.findById(newLampe.etageId);

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
    await this.connectedElementsService.removeDeviceFromPin(
      toBeDeleted.pin,
      toBeDeleted.carteId,
    );

    return this.deleteById(id);
  }
}
