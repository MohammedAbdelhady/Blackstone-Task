import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Car,
  AccessCard,
} from '../models';
import {CarRepository} from '../repositories';

export class CarAccessCardController {
  constructor(
    @repository(CarRepository) protected carRepository: CarRepository,
  ) { }

  @get('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Car has one AccessCard',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AccessCard),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<AccessCard>,
  ): Promise<AccessCard> {
    return this.carRepository.accessCard(id).get(filter);
  }

  @post('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Car model instance',
        content: {'application/json': {schema: getModelSchemaRef(AccessCard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Car.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessCard, {
            title: 'NewAccessCardInCar',
            exclude: ['id'],
            optional: ['carId']
          }),
        },
      },
    }) accessCard: Omit<AccessCard, 'id'>,
  ): Promise<AccessCard> {
    return this.carRepository.accessCard(id).create(accessCard);
  }

  @patch('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Car.AccessCard PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessCard, {partial: true}),
        },
      },
    })
    accessCard: Partial<AccessCard>,
    @param.query.object('where', getWhereSchemaFor(AccessCard)) where?: Where<AccessCard>,
  ): Promise<Count> {
    return this.carRepository.accessCard(id).patch(accessCard, where);
  }

  @del('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Car.AccessCard DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(AccessCard)) where?: Where<AccessCard>,
  ): Promise<Count> {
    return this.carRepository.accessCard(id).delete(where);
  }
}
