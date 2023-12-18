import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { AppService } from '../Service/app.service'
import { ICalculate } from 'src/interfaces/appService'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  async getHello(): Promise<string> {
    return await this.appService.getHello()
  }
  @Get(`/carCalculate/:id`)
  calculate(@Param('id') id: string): ICalculate {
    try {
      return this.appService.calculate(id)
    } catch (err) {
      throw new NotFoundException({
        message: err.message
      })
    }
  }
}
