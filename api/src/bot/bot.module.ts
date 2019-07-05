import {Module} from '@nestjs/common'
import {BotFactory} from './bot.factory'
import {BotMachineProvider} from './bot.machine'
import {BotService} from './bot.service'
import {BotController} from './bot.controller'

@Module({
  providers: [BotFactory, BotMachineProvider, BotService],
  controllers: [BotController],
})
export class BotModule {}
