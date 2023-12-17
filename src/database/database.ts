import { IDatabase } from 'src/interfaces/database'

export const database: IDatabase = [
  {
    id: '1',
    name: 'Peugeot 208',
    totalValue: 7899000,
    buyOptions: [
      {
        type: 'rent',
        data: {
          startPayment: 0,
          installments: 48,
          value: 192099
        }
      },
      {
        type: 'buy',
        data: {
          startPayment: 2369700,
          installments: 48,
          value: 189800
        }
      }
    ]
  }
]
