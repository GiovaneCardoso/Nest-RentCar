import { IResult, IcalculateDiff } from 'src/interfaces/carModel'
import { ICar } from 'src/interfaces/database'
import { resultify } from 'src/utils/utils'
export class CarModel {
  constructor(private readonly car: ICar) {}

  calculateBase(typeCalc: 'rent' | 'buy') {
    const { installments, startPayment, value } =
      this.car.optionsToAcquire.find(({ type }) => type === typeCalc)
    const total = installments * value + startPayment
    return { total, installments, startPayment, value }
  }
  buy(): IResult {
    const {
      total: base,
      installments,
      startPayment,
      value
    } = this.calculateBase('buy')
    const years = installments / 12
    const ipvaBase = 0.04
    const insureBase = 0.06

    let carValue = this.car.totalValue
    let ipvaSum = this.car.totalValue * ipvaBase
    let insureSum = this.car.totalValue * insureBase
    const revision = 31250 * (years * 2)

    for (let i = 0; i < years; i++) {
      const desvalorization = 0.105
      if (i === 0) {
        carValue = this.car.totalValue
      }
      carValue -= carValue * desvalorization
      ipvaSum += carValue * ipvaBase
      insureSum += carValue * insureBase
    }
    const costTotal = ipvaSum + insureSum + base + revision
    const discountTotal = carValue
    const total = costTotal - discountTotal
    return {
      installments,
      value: resultify(value),
      subTotal: resultify(costTotal),
      total: resultify(total),
      initialValue: resultify(startPayment),
      initialEconomy: 0,
      ipva: resultify(ipvaSum),
      insure: resultify(insureSum),
      revision: resultify(revision),
      carAfterSale: resultify(discountTotal)
    }
  }
  rent(): IResult {
    const { total, value, installments } = this.calculateBase('rent')
    const initialValueEconomized = this.car.totalValue * 0.3
    return {
      installments,
      value: resultify(value),
      subTotal: resultify(total),
      total: resultify(total - initialValueEconomized),
      initialEconomy: resultify(initialValueEconomized),
      initialValue: 0,
      ipva: 0,
      insure: 0,
      revision: 0
    }
  }
  calculateDiff(buyTotal: number, rentTotal: number): IcalculateDiff {
    const winner = buyTotal > rentTotal ? 'rent' : 'buy'
    const difference =
      winner === 'rent' ? buyTotal - rentTotal : rentTotal - buyTotal
    return {
      winner,
      difference: difference * 100
    }
  }
}
