export type IDatabase = ICar[]
export interface ICar {
  id: string
  name: string
  totalValue: number

  buyOptions: IBuyOptions[]
}
export interface IBuyOptions {
  type: 'rent' | 'buy'
  data: IBuyOptionsData
}
export interface IBuyOptionsData {
  startPayment: number
  installments: number
  value: number
}
