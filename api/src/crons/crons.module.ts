import {Module, forwardRef} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CronsService} from './crons.service'
import {Cron} from './cron.entity'
import {BotModule} from '../bot/bot.module'

@Module({
  imports: [TypeOrmModule.forFeature([Cron]), forwardRef(() => BotModule)],
  providers: [CronsService],
  exports: [CronsService],
})
export class CronsModule {}
