import { Module } from '@nestjs/common'
import { AppController } from '../Controller/app.controller'
import { AppService } from '../Service/app.service'
import { PrismaService } from 'src/database/prisma.service'
import { CarController } from 'src/Controller/car.controller'
import { CarService } from 'src/Service/car.service'

@Module({
  imports: [],
  controllers: [AppController, CarController],
  providers: [AppService, CarService, PrismaService]
})
export class AppModule {}
