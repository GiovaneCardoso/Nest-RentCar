import { ICar } from 'src/interfaces/database'

interface IcalculateDiff {
  difference: number
  winner: 'rent' | 'buy'
}
export class CarModel {
  constructor(private readonly car: ICar) {}

  calculateBase(typeCalc: 'rent' | 'buy') {
    const {
      data: { installments, startPayment, value }
    } = this.car.buyOptions.find(({ type }) => type === typeCalc)
    const total = installments * value + startPayment
    return { total, installments }
  }
  buy(): number {
    const { total: base, installments } = this.calculateBase('buy')
    const years = installments / 12
    const ipvaBase = 0.04
    const insureBase = 0.06

    let carValue = this.car.totalValue
    let ipvaSum = this.car.totalValue * ipvaBase
    let insureSum = this.car.totalValue * insureBase
    //Consideer revision after
    for (let i = 0; i < years; i++) {
      const desvalorization = 0.105
      if (i === 0) {
        carValue = this.car.totalValue
      }
      carValue -= carValue * desvalorization
      ipvaSum += carValue * ipvaBase
      insureSum += carValue * insureBase
    }
    const costTotal = ipvaSum + insureSum + base
    const discountTotal = carValue
    const total = costTotal - discountTotal
    return total
  }
  rent(): number {
    const { total } = this.calculateBase('rent')
    const initialValueEconomized = this.car.totalValue * 0.3
    return total - initialValueEconomized
  }
  calculateDiff(buyTotal: number, rentTotal: number): IcalculateDiff {
    const winner = buyTotal > rentTotal ? 'rent' : 'buy'
    const difference =
      winner === 'rent'
        ? (buyTotal - rentTotal) / 100
        : (rentTotal - buyTotal) / 100
    return {
      winner,
      difference
    }
  }
}
