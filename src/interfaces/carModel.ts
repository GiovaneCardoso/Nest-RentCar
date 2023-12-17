export interface IcalculateDiff {
  difference: number
  winner: 'rent' | 'buy'
}
export interface IResult {
  total: number
  ipva: number
  insure: number
  revision: number
  installments: number
  value: number
  subTotal: number
  initialEconomy: number
  initialValue: number
  carAfterSale?: number
}
