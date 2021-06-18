import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Car, CarRelations, Employee, AccessCard} from '../models';
import {EmployeeRepository} from './employee.repository';
import {AccessCardRepository} from './access-card.repository';

export class CarRepository extends DefaultCrudRepository<
  Car,
  typeof Car.prototype.id,
  CarRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Car.prototype.id>;

  public readonly accessCard: HasOneRepositoryFactory<AccessCard, typeof Car.prototype.id>;

  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('AccessCardRepository') protected accessCardRepositoryGetter: Getter<AccessCardRepository>,
  ) {
    super(Car, dataSource);
    this.accessCard = this.createHasOneRepositoryFactoryFor('accessCard', accessCardRepositoryGetter);
    this.registerInclusionResolver('accessCard', this.accessCard.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
