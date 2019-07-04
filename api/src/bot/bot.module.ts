import {Module} from '@nestjs/common'
import {BotFactory} from './bot.factory'
import {BotService} from './bot.service'
import {BotController} from './bot.controller'

@Module({
  providers: [BotFactory, BotService],
  controllers: [BotController],
})
export class BotModule {}
