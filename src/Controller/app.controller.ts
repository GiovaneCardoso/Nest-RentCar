import { Controller, Get, Param } from '@nestjs/common'
import { AppService, ICalculate, IError } from '../Service/app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hello')
  getHello(): string {
    return this.appService.getHello()
  }
  @Get(`/carCalculate/:id`)
  calculate(@Param('id') id: string): ICalculate | IError {
    return this.appService.calculate(id)
  }
}
