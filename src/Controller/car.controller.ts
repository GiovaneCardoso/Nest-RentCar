import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { CarService } from 'src/Service/car.service'
import { Car, Prisma } from '@prisma/client'

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}
  @Get('/hello')
  async getHello(): Promise<string> {
    return await this.carService.getHello()
  }
  @Get()
  async getCars(): Promise<Car[]> {
    return await this.carService.getCars()
  }
  @Get('/:id')
  async getCarById(@Param('id') id: string): Promise<Car> {
    return await this.carService.getCarById(id)
  }
  @Delete('/:id')
  async deleteCar(@Param('id') id: string): Promise<void> {
    return await this.carService.deleteCar(id)
  }
  @Patch('/:id')
  async updateCar(@Param('id') id: string, @Body() body: Partial<Car>) {
    return await this.carService.editCar(id, body)
  }
  @Post('/new')
  async createCar(
    @Body() body: Prisma.CarGetPayload<{ include: { optionsToAcquire: true } }>
  ) {
    return await this.carService.createCar(body)
  }
}
