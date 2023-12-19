import { Injectable } from '@nestjs/common'
import { Car } from '@prisma/client'
import { randomUUID } from 'crypto'
import { PrismaService } from 'src/database/prisma.service'

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
  async createCar(car: Car): Promise<Car> {
    const carToAdd = {
      id: randomUUID(),
      ...car
    }
    await this.prisma.car.create({
      data: {
        ...carToAdd
      }
    })
    await this.prisma.optionToAcquire.create({
      data: {
        type: 'rent',
        value: 12222,
        carId: carToAdd.id,
        financingTax: 1.8
      }
    })

    return carToAdd
  }
  async editCar(id: string, car: Partial<Car>) {
    await this.prisma.car.update({
      data: car,
      where: {
        id
      }
    })
  }
  async deleteCar(carId: string) {
    await this.prisma.car.delete({
      where: {
        id: carId
      }
    })
  }
  async getCars(): Promise<Car[]> {
    return await this.prisma.car.findMany({
      include: {
        optionsToAcquire: true
      }
    })
  }
  async getCarById(id: string): Promise<Car> {
    return await this.prisma.car.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        optionsToAcquire: true
      }
    })
  }
}
