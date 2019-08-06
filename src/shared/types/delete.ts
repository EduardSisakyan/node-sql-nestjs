import { FindConditions } from 'typeorm';

export type DeleteConditions<T> = number | number[] | FindConditions<T>;
