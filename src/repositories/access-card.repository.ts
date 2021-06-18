import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {AccessCard, AccessCardRelations} from '../models';

export class AccessCardRepository extends DefaultCrudRepository<
  AccessCard,
  typeof AccessCard.prototype.id,
  AccessCardRelations
> {
  constructor(
    @inject('datasources.mongoDB') dataSource: MongoDbDataSource,
  ) {
    super(AccessCard, dataSource);
  }
}
