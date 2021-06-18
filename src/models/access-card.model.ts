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
  })
  credit: number;

  @property({
    type: 'date',
    required: true,
  })
  lastSwipeTimestamp: string;


  constructor(data?: Partial<AccessCard>) {
    super(data);
  }
}

export interface AccessCardRelations {
  // describe navigational properties here
}

export type AccessCardWithRelations = AccessCard & AccessCardRelations;
