import {Entity, model, property} from '@loopback/repository';

@model()
export class AccessCard extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
    default: 10
  })
  credit: number;

  @property({
    type: 'date',
  })
  lastChargedDate: string;

  @property({
    type: 'string',
  })
  carId?: string;

  constructor(data?: Partial<AccessCard>) {
    super(data);
  }
}

export interface AccessCardRelations {
  // describe navigational properties here
}

export type AccessCardWithRelations = AccessCard & AccessCardRelations;
