import { Module } from '@nestjs/common'
import { AppController } from '../Controller/app.controller'
import { AppService } from '../Service/app.service'
import { PrismaService } from 'src/database/prisma.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService]
})
export class AppModule {}
