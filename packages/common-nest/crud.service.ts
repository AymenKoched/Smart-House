import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { BaseEntity, BaseRepository } from './base';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { handleError } from './utils-nest';

export abstract class CrudService<TEntity extends BaseEntity = BaseEntity> {
  protected abstract notFoundErrorKey: string;
  protected abstract notFoundErrorMessage: string;

  constructor(private readonly repository: BaseRepository<TEntity>) {}

  async findAll(): Promise<TEntity[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<TEntity> {
    const item = await this.repository.findById(id);
    if (!item) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }

    return item;
  }

  async create(entity: QueryDeepPartialEntity<TEntity>): Promise<TEntity> {
    try {
      const ctor = this.repository.entityType;
      const data = new ctor(entity);
      return await this.repository.repo.save(data);
    } catch (err) {
      const errors = handleError(err);
      const error = {
        message: errors,
        error: 'Bad Request',
        statusCode: 400,
      };
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateById(
    id: string,
    partial: QueryDeepPartialEntity<TEntity>,
  ): Promise<TEntity> {
    const found = await this.repository.repo.preload(
      new this.repository.entityType({ id, ...partial }),
    );
    if (!found) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }
    await this.repository.updateById(id, partial);
    return this.findById(id);
  }

  async deleteById(id: string): Promise<TEntity[]> {
    const toBeDeleted = await this.repository.findById(id);
    if (!toBeDeleted) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }

    return this.repository.deleteById(id);
  }
}
