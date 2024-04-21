import {
  DataSource,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { EntityConstructor } from '../utils-nest';
import { InjectDataSource } from '@nestjs/typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { forEach } from 'lodash';

export abstract class BaseRepository<TEntity extends BaseEntity = BaseEntity> {
  public abstract entityType: EntityConstructor;

  constructor(@InjectDataSource() private dataSource: DataSource) {}

  get repo(): Repository<TEntity> {
    return this.dataSource.getRepository(this.entityType);
  }

  async findAll(expands?: string[]): Promise<TEntity[]> {
    if (expands && expands.length > 0) {
      return this.repo.find({ relations: expands });
    } else {
      return this.repo.find();
    }
  }

  async findById(id: string, expands?: string[]): Promise<TEntity | null> {
    return this.repo.findOne({
      relations: expands,
      where: { id } as FindOptionsWhere<TEntity>,
    });
  }

  async updateById(
    id: string,
    partialEntity: QueryDeepPartialEntity<TEntity>,
  ): Promise<UpdateResult> {
    const criteria = { id } as FindOptionsWhere<TEntity>;
    const result = await this.repo.update(criteria, { ...partialEntity, id });
    if (!result.affected) {
      console.log(
        `[${this.entityType.name}] UPDATE : No matching rows where found for update`,
      );
    } else {
      console.log(
        `[${this.entityType.name}] UPDATE : ${
          result.affected
        } rows have been updated with the following data ${JSON.stringify(
          partialEntity,
        )}`,
      );
    }
    return result;
  }

  async deleteById(id: string): Promise<TEntity[]> {
    return this.deleteByCriteria({ id } as FindOptionsWhere<TEntity>);
  }

  async deleteByCriteria(
    criteria: FindOptionsWhere<TEntity>,
  ): Promise<TEntity[]> {
    const entities = await this.repo.find({ where: criteria });
    forEach(entities, (e) => {
      e.deletedAt = new Date();
    });
    return this.repo.save(entities);
  }
}
