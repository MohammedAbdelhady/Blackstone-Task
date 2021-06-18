import {
  repository
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, requestBody,
  response
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
    description: 'Adding a new employee\'s car ',
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
    description: 'Retrieve all cars',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Car, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<Car[]> {
    return this.carRepository.find();
  }

  @get('/cars/{id}')
  @response(200, {
    description: 'Get specific car by its Id',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Car, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string
  ): Promise<Car> {
    return this.carRepository.findById(id);
  }

  @patch('/cars/{id}')
  @response(204, {
    description: 'Update car attributes',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Car, {partial: true, exclude: ['id']}),
        },
      },
    })
    car: Car,
  ): Promise<void> {
    await this.carRepository.updateById(id, car);
  }

  @del('/cars/{id}')
  @response(204, {
    description: 'Delete a car',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.carRepository.deleteById(id);
  }
}
