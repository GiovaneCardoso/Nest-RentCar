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
  calculate(carId: string): ICalculate | IError {
    const car = database.find(({ id }) => id === carId)
    if (!car) {
      return {
        statusCode: 404,
        message: 'Car not found'
      }
    }

    const carModel = new CarModel(car)

    const buyTotal = carModel.buy()
    const rentTotal = carModel.rent()
    const winner = buyTotal > rentTotal ? 'rent' : 'buy'

    return {
      winner,
      message: `${winner} options is better`,
      difference:
        winner === 'rent' ? buyTotal - rentTotal : rentTotal - buyTotal
    }
  }
}
