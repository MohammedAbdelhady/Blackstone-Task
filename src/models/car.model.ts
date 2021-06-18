import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Employee} from './employee.model';
import {AccessCard} from './access-card.model';

@model()
export class Car extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
    required: true,
  })
  plateNumber: string;

  @belongsTo(() => Employee)
  employeeId: string;

  @hasOne(() => AccessCard)
  accessCard: AccessCard;

  constructor(data?: Partial<Car>) {
    super(data);
  }
}

export interface CarRelations {
  // describe navigational properties here
}

export type CarWithRelations = Car & CarRelations;
