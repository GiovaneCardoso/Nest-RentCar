import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { CarModel } from 'src/Model/CarModel'
import { database } from 'src/database/database'
import { PrismaService } from 'src/database/prisma.service'
import { ICalculate } from 'src/interfaces/appService'
import { resultify } from 'src/utils/utils'
@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<string> {
    await this.prisma.car.create({
      data: {
        id: randomUUID(),
        name: 'Renault Kwid',
        totalValue: 7750000
      }
    })
    return 'Hello World!'
  }
  calculate(carId: string): ICalculate {
    const car = database.find(({ id }) => id === carId)
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
