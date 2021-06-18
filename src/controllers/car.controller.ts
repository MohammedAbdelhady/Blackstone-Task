import {
  Filter,
  FilterExcludingWhere,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Car} from '../models';
import {CarRepository} from '../repositories';

export class CarController {
  constructor(
    @repository(CarRepository)
    public carRepository : CarRepository,
  ) {}

  @post('/cars')
  @response(200, {
    description: 'Car model instance',
    content: {'application/json': {schema: getModelSchemaRef(Car)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {
            title: 'NewCar',
            exclude: ['id'],
          }),
        },
      },
    })
    car: Omit<Car, 'id'>,
  ): Promise<Car> {
    return this.carRepository.create(car);
  }

  @get('/cars')
  @response(200, {
    description: 'Array of Car model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Car, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Car) filter?: Filter<Car>,
  ): Promise<Car[]> {
    return this.carRepository.find(filter);
  }

  @get('/cars/{id}')
  @response(200, {
    description: 'Car model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Car, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Car, {exclude: 'where'}) filter?: FilterExcludingWhere<Car>
  ): Promise<Car> {
    return this.carRepository.findById(id, filter);
  }

  @patch('/cars/{id}')
  @response(204, {
    description: 'Car PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {partial: true}),
        },
      },
    })
    car: Car,
  ): Promise<void> {
    await this.carRepository.updateById(id, car);
  }

  @del('/cars/{id}')
  @response(204, {
    description: 'Car DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carRepository.deleteById(id);
  }
}
