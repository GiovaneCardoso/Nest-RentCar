export interface ICalculate {
  message: string
  result: 'rent' | 'buy'
  difference: number
  totalizers: {
    type: string
    installments: number
    value: number
    installmentsTotal: number
    result: number
    carAfterSale?: number
    extraExpenses: ExtraExpenses[]
  }[]
}
interface ExtraExpenses {
  type: string
  value: number
}
