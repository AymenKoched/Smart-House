import { Injectable } from '@nestjs/common';
import { CrudService, NotFoundErrors } from '../../packages';
import { CarteEntity } from './entities';
import { CartesRepository } from './repositories';
import { CarteResponse } from './dto';
import { map } from 'lodash';
import { LampesService } from '../devices';

@Injectable()
export class CartesService extends CrudService<CarteEntity> {
  protected notFoundErrorKey = NotFoundErrors.CartesNotFound;
  protected notFoundErrorMessage = 'The cartes searched is not found';

  constructor(
    private readonly carteRepo: CartesRepository,
    private readonly lampesService: LampesService,
  ) {
    super(carteRepo);
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
