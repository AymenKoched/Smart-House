import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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

  async addDeviceToPin(pin: number, carteId: string, deviceId: string) {
    return this.updateByCriteria({ pin, carte: { id: carteId } }, { deviceId });
  }

  async removeDeviceFromPin(pin: number, carteId: string) {
    return this.updateByCriteria(
      { pin, carte: { id: carteId } },
      { deviceId: null },
    );
  }

  async checkPin(pin: number, carteId: string) {
    const cnx = await this.connectedElementRepo.repo.findOne({
      where: { pin, carte: { id: carteId } },
      relations: ['carte'],
    });

    if (!cnx) {
      const error = {
        message: `This pin ${pin} does not exist`,
        error: 'Bad Request',
        statusCode: 400,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    if (cnx.deviceId) {
      const error = {
        message: `This pin ${pin} already used`,
        error: 'Bad Request',
        statusCode: 400,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
