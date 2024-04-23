import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { CrudService, NotFoundErrors } from '../../../packages';
import { LampesRepository } from '../repositories';
import { LampeEntity } from '../entities';
import { ConnectedElementService, ConnectedElementsModule } from '../../cartes';

@Injectable()
export class LampesService extends CrudService<LampeEntity> {
  protected notFoundErrorKey = NotFoundErrors.LampesNotFound;
  protected notFoundErrorMessage = 'The lampes searched is not found';

  constructor(
    private readonly lampesRepo: LampesRepository,
    @Inject(forwardRef(() => ConnectedElementsModule))
    private readonly connectedElementsService: ConnectedElementService,
  ) {
    super(lampesRepo);
  }

  // async createLampe(newLampe: CreateLampeDto): Promise<LampeResponse> {}
}
