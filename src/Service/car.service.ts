import { Injectable } from '@nestjs/common'
import { Car, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PrismaService } from 'src/database/prisma.service'
import { ICar } from 'src/interfaces/database'
type CarPayload = Prisma.CarGetPayload<{ include: { optionsToAcquire: true } }>
@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}
  async getHello(): Promise<string> {
    await this.prisma.car.create({
      data: {
        id: randomUUID(),
        name: 'Renaulttt Kwid',
        totalValue: 7750000
      }
    })
    return 'Hello World!'
  }
  async createCar(
    car: Prisma.CarGetPayload<{ include: { optionsToAcquire: true } }>
  ) {
    const carCreated = await this.prisma.car.create({
      data: {
        id: randomUUID(),
        name: car.name,
        totalValue: car.totalValue
      }
    })
    const optionsToAcquireCreated = car.optionsToAcquire.map(async (option) => {
      return await this.prisma.optionToAcquire.create({
        data: {
          carId: carCreated.id,
          ...option
        }
      })
    })

    return { ...carCreated, optionsToAcquire: optionsToAcquireCreated }
  }
  async editCar(id: string, car: Partial<Car>) {
    const newCar = await this.prisma.car.update({
      data: car,
      where: {
        id
      }
    })
    return newCar
  }
  async deleteCar(carId: string) {
    await this.prisma.optionToAcquire.deleteMany({
      where: {
        carId
      }
    })

    await this.prisma.car.delete({
      where: {
        id: carId
      }
    })
  }
  async getCars(): Promise<CarPayload[]> {
    return await this.prisma.car.findMany({
      include: {
        optionsToAcquire: true
      }
    })
  }
  async getCarById(id: string): Promise<CarPayload> {
    try {
      const car = await this.prisma.car.findUniqueOrThrow({
        where: {
          id
        },
        include: {
          optionsToAcquire: true
        }
      })
      return car
    } catch {
      throw new Error('Error')
    }
  }
}
