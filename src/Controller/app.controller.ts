import { Controller, Get, NotFoundException, Param } from '@nestjs/common'
import { AppService } from '../Service/app.service'
import { ICalculate } from 'src/interfaces/appService'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(`/carCalculate/:id`)
  async calculate(@Param('id') id: string): Promise<ICalculate> {
    try {
      return await this.appService.calculate(id)
    } catch (err) {
      throw new NotFoundException({
        message: err.message
      })
    }
  }
}
