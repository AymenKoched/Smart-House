import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';
import { EtageEntity } from './entities';
import { EtagesRepository } from './repositories';
import { map } from 'lodash';
import { LampesService } from '../devices';
import { EtageResponse } from './dto';

@Injectable()
export class EtagesService extends CrudService<EtageEntity> {
  protected notFoundErrorKey = NotFoundErrors.EtagesNotFound;
  protected notFoundErrorMessage = 'The etages searched is not found';

  constructor(
    private readonly etagesRepo: EtagesRepository,
    @Inject(forwardRef(() => LampesService))
    private readonly lampesService: LampesService,
  ) {
    super(etagesRepo);
  }

  async deleteEtage(id: string): Promise<EtageResponse[]> {
    const toBeDeletedEtage = await this.findById(id, ['lampes', 'stores']);

    const toBeDeletedLampes = map(toBeDeletedEtage.lampes, (lampe) => lampe.id);

    await Promise.all(
      map(toBeDeletedLampes, (lampeId) =>
        this.lampesService.deleteById(lampeId),
      ),
    );

    return await this.deleteById(id);
  }
}
