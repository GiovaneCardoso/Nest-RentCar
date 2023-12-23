export type IDatabase = ICar[]
export interface ICar {
  id: string
  name: string
  totalValue: number
  optionsToAcquire: IBuyOptions[]
}
export interface IBuyOptions {
  id: number
  carId: string
  type: 'rent' | 'buy'
  value: number
  financingTax: number
  installments: number
  startPayment: number
}
