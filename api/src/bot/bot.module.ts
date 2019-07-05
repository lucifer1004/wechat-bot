import {Module} from '@nestjs/common'
import {BotFactory} from './bot.factory'
import {BotService} from './bot.service'
import {BotController} from './bot.controller'
import {UsersModule} from '../users/users.module'

@Module({
  imports: [UsersModule],
  providers: [BotFactory, BotService],
  controllers: [BotController],
})
export class BotModule {}
