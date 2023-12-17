import { Injectable } from '@nestjs/common'
import { CarModel } from 'src/Model/CarModel'
import { database } from 'src/database/database'
export interface ICalculate {
  message: string
  winner: 'rent' | 'buy'
  difference: number
}
export interface IError {
  statusCode: number
  message: string
}
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!'
  }
  calculate(carId: string): ICalculate {
    const car = database.find(({ id }) => id === carId)
    if (!car) {
      throw new Error('Car not found')
    }

    const carModel = new CarModel(car)
    const buyTotal = carModel.buy()
    const rentTotal = carModel.rent()
    const { difference, winner } = carModel.calculateDiff(buyTotal, rentTotal)

    return {
      winner,
      message: `${winner} options is better`,
      difference: Number(difference.toFixed(2))
    }
  }
}
