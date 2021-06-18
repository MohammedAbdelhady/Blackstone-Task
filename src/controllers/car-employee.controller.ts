import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Car,
  Employee,
} from '../models';
import {CarRepository} from '../repositories';

export class CarEmployeeController {
  constructor(
    @repository(CarRepository)
    public carRepository: CarRepository,
  ) { }

  @get('/cars/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Car',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Car.prototype.id,
  ): Promise<Employee> {
    return this.carRepository.employee(id);
  }
}
