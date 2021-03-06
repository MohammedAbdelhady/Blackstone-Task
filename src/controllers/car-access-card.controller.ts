import {
  Count, repository
} from '@loopback/repository';
import {
  getModelSchemaRef, param,
  patch,
  post
} from '@loopback/rest';
import {ApplicationError} from '../Errors/application.error';
import {
  AccessCard, Car
} from '../models';
import {AccessCardRepository, CarRepository} from '../repositories';


export class CarAccessCardController {
  constructor(
    @repository(CarRepository) protected carRepository: CarRepository,
     @repository(AccessCardRepository) protected accessCardRepository: AccessCardRepository,
  ) { }

  @post('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Register a car in the highway and creates its access card',
        content: {'application/json': {schema: getModelSchemaRef(AccessCard)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Car.prototype.id,
  ): Promise<AccessCard> {
    const isCarExists: boolean =  await this.carRepository.exists(id)

    if(!isCarExists){
      throw new ApplicationError("This car doesn't exist", 404, "ECar001");
    }

    const isCarAlreadyHasCard: Count =  await this.accessCardRepository.count({carId: id});

    if(isCarAlreadyHasCard.count){
      throw new ApplicationError("this car already has a card", 400, "ECar002");
    }

    return this.carRepository.accessCard(id).create({});
  }

  @patch('/cars/{id}/access-card', {
    responses: {
      '200': {
        description: 'Simulation of passing through the exit gate',
        content: {'application/json': {schema: {remainingCredit: 0}}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string
  ): Promise<{remainingCredit: number}> {
     const isCarExists: boolean =  await this.carRepository.exists(id)

      if(!isCarExists){
        throw new ApplicationError("This car doesn't exist", 404, "ECar001");
      }

      const isCarAlreadyHasCard: Count =  await this.accessCardRepository.count({carId: id});

      if(!isCarAlreadyHasCard.count){
        throw new ApplicationError("This car hasn't been registered yet", 400, "ECar003");
      }

      const accessCard = await this.carRepository.accessCard(id).get()

      const now: Date = new Date()
      let shouldBeCharged = false

      if(!accessCard.lastChargedDate){
        shouldBeCharged = true
      }else{

        const nowInMilliseconds: number = now.getTime();
        const lastSwipeDatePlusOneMinute: number = new Date(accessCard.lastChargedDate).getTime() + (1000 * 60);

        if(lastSwipeDatePlusOneMinute < nowInMilliseconds){
          shouldBeCharged = true
        }
    }

    if(shouldBeCharged){

      if(accessCard.credit < 4){
        throw new ApplicationError("The access card doesn't have enough credit", 400, "ECar004");
      }

      accessCard.credit -= 4;
      accessCard.lastChargedDate = now.toISOString()
      await this.accessCardRepository.updateAll(accessCard, {carId: id});
    }

    return {remainingCredit : accessCard.credit};
  }

}
