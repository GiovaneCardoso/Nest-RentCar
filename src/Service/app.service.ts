import { Injectable } from '@nestjs/common'
import { CarModel } from 'src/Model/CarModel'
import { ICalculate } from 'src/interfaces/appService'
import { resultify } from 'src/utils/utils'
import { CarService } from './car.service'
@Injectable()
export class AppService {
  constructor(private carService: CarService) {}
  async calculate(carId: string): Promise<ICalculate> {
    const car = await this.carService.getCarById(carId)
    if (!car) {
      throw new Error('Car not found')
    }

    const carModel = new CarModel(car)
    const { total, ...buy } = carModel.buy()
    const { total: rentTotal, ...rent } = carModel.rent()
    const { difference, winner } = carModel.calculateDiff(total, rentTotal)

    return {
      result: winner,
      message: `${winner} options is better`,
      difference: resultify(difference),
      totalizers: [
        {
          type: 'buy',
          installments: buy.installments,
          value: buy.value,
          installmentsTotal: buy.value * buy.installments,
          result: total,
          carAfterSale: buy.carAfterSale,
          extraExpenses: [
            {
              type: 'IPVA',
              value: buy.ipva
            },
            {
              type: 'INSURE',
              value: buy.insure
            },
            {
              type: 'MAINTENANCE',
              value: buy.revision
            }
          ]
        },
        {
          type: 'rent',
          installments: rent.installments,
          value: rent.value,
          installmentsTotal: rent.value * rent.installments,
          result: total,
          extraExpenses: []
        }
      ]
    }
  }
}
