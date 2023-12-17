import { ICar } from 'src/interfaces/database'

export class CarModel {
  car: ICar
  constructor(car: ICar) {
    this.car = car
  }
  calculateBase(typeCalc: 'rent' | 'buy') {
    const {
      data: { installments, startPayment, value }
    } = this.car.buyOptions.find(({ type }) => type === typeCalc)
    const total = installments * value + startPayment
    return total
  }
  buy(): number {
    return this.calculateBase('buy')
  }
  rent(): number {
    return this.calculateBase('rent')
  }
}
