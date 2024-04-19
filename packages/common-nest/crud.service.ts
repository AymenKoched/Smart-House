import { NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseRepository } from './base.repository';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { DeepPartial, UpdateResult } from 'typeorm';
import { isArray } from 'lodash';

export abstract class CrudService<TEntity extends BaseEntity = BaseEntity> {
  protected abstract notFoundErrorKey: string;
  protected abstract notFoundErrorMessage: string;

  constructor(private readonly repository: BaseRepository<TEntity>) {}

  async findAll(): Promise<TEntity[]> {
    return this.repository.findAll();
  }

  async findById(id: string): Promise<TEntity> {
    return this.repository.findById(id);
  }

  async create(
    entity: QueryDeepPartialEntity<TEntity> | DeepPartial<TEntity>[],
  ): Promise<TEntity> {
    const ctor = this.repository.entityType;
    const data = isArray(entity)
      ? entity.map((e) => new ctor(e))
      : new ctor(entity);
    return this.repository.repo.save(data);
  }

  async updateById(
    id: string,
    partial: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    const found = await this.repository.repo.preload(
      new this.repository.entityType({ id, ...partial }),
    );
    if (!found) {
      throw new NotFoundException(
        this.notFoundErrorKey,
        this.notFoundErrorMessage,
      );
    }
    return this.repository.updateById(id, partial);
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
