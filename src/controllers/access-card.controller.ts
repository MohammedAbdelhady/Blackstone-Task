import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AccessCard} from '../models';
import {AccessCardRepository} from '../repositories';

export class AccessCardController {
  constructor(
    @repository(AccessCardRepository)
    public accessCardRepository : AccessCardRepository,
  ) {}

  @post('/accessCards')
  @response(200, {
    description: 'AccessCard model instance',
    content: {'application/json': {schema: getModelSchemaRef(AccessCard)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessCard, {
            title: 'NewAccessCard',
            exclude: ['id'],
          }),
        },
      },
    })
    accessCard: Omit<AccessCard, 'id'>,
  ): Promise<AccessCard> {
    return this.accessCardRepository.create(accessCard);
  }

  @get('/accessCards/count')
  @response(200, {
    description: 'AccessCard model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AccessCard) where?: Where<AccessCard>,
  ): Promise<Count> {
    return this.accessCardRepository.count(where);
  }

  @get('/accessCards')
  @response(200, {
    description: 'Array of AccessCard model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AccessCard, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AccessCard) filter?: Filter<AccessCard>,
  ): Promise<AccessCard[]> {
    return this.accessCardRepository.find(filter);
  }

  @patch('/accessCards')
  @response(200, {
    description: 'AccessCard PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessCard, {partial: true}),
        },
      },
    })
    accessCard: AccessCard,
    @param.where(AccessCard) where?: Where<AccessCard>,
  ): Promise<Count> {
    return this.accessCardRepository.updateAll(accessCard, where);
  }

  @get('/accessCards/{id}')
  @response(200, {
    description: 'AccessCard model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AccessCard, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AccessCard, {exclude: 'where'}) filter?: FilterExcludingWhere<AccessCard>
  ): Promise<AccessCard> {
    return this.accessCardRepository.findById(id, filter);
  }

  @patch('/accessCards/{id}')
  @response(204, {
    description: 'AccessCard PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessCard, {partial: true}),
        },
      },
    })
    accessCard: AccessCard,
  ): Promise<void> {
    await this.accessCardRepository.updateById(id, accessCard);
  }

  @put('/accessCards/{id}')
  @response(204, {
    description: 'AccessCard PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() accessCard: AccessCard,
  ): Promise<void> {
    await this.accessCardRepository.replaceById(id, accessCard);
  }

  @del('/accessCards/{id}')
  @response(204, {
    description: 'AccessCard DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.accessCardRepository.deleteById(id);
  }
}
