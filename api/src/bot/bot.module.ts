import {Module} from '@nestjs/common'
import {BotFactory} from './bot.factory'
import {BotService} from './bot.service'
import {BotController} from './bot.controller'
import {UsersModule} from '../users/users.module'
import {CronsModule} from '../crons/crons.module'

@Module({
  imports: [UsersModule, CronsModule],
  providers: [BotFactory, BotService],
  controllers: [BotController],
})
export class BotModule {}
