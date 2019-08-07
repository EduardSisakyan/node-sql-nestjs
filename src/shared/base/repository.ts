import { Repository, FindConditions, FindManyOptions, SelectQueryBuilder } from 'typeorm';

import { IPaginationOptions } from '../interfaces/pagination-options';
import { Pagination } from '../models/pagination';
import { validate, ValidationError } from 'class-validator';
import { CustomException } from '../models/custom-exception';
import { DeleteConditions } from '../types/delete';


export class BaseRepository<T> extends Repository<T> {

  public async deleteOrFail(condition: DeleteConditions<T>, message?: string): Promise<boolean> {
    const res = await this.delete(condition);
    if (res.affected) {
      return true;
    } else {
      throw new CustomException(message || 'Item not found');
    }
  }

  public async validateOrFail(entity: T): Promise<boolean> {
    const errors = await validate(entity);
    if (errors.length > 0) {
      throw new CustomException(this.buildError(errors));
    } else {
      return true;
    }
  }

  public async paginate(options: IPaginationOptions, searchOptions?: FindConditions<T> | FindManyOptions<T>): Promise<Pagination<T>> {
    const [ page, limit ] = this.resolveOptions(options);

    const [ items, total ] = await this.findAndCount({
      skip: page * limit,
      take: limit,
      ...searchOptions
    });

    return this.createPaginationObject(items, total, limit);
  }

  public async paginateQueryBuilder(queryBuilder: SelectQueryBuilder<T>, options: IPaginationOptions): Promise<Pagination<T>> {
    const [ page, limit ] = this.resolveOptions(options);

    const [ items, total ] = await queryBuilder
      .limit(limit)
      .offset(page * limit)
      .getManyAndCount();

    return this.createPaginationObject(items, total, limit);
  }

  private buildError(errors: ValidationError[]) {
    const result = [];
    errors.forEach(el => {
      Object.entries(el.constraints).forEach(constraint => {
        result.push(constraint[1]);
      });
    });
    return result.join(', ');
  }

  private createPaginationObject(items: T[], total: number, limit: number) {
    return new Pagination(items, items.length, total, Math.ceil(total / limit));
  }

  private resolveOptions(options: IPaginationOptions): [number, number] {
    const page = options.page > 0 ? options.page - 1 : options.page < 0 ? 0 : options.page;
    const limit = options.limit || 20;

    return [ page, limit ];
  }
}
