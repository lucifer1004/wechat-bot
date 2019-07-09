import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CronsService} from './crons.service'
import {Cron} from './cron.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Cron])],
  providers: [CronsService],
  exports: [CronsService],
})
export class CronsModule {}
