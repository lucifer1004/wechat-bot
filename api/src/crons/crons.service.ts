import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {InjectSchedule, Schedule} from 'nest-schedule'
import {Repository} from 'typeorm'
import {Cron} from './cron.entity'
import {User} from '../users/user.entity'
import {BotService} from '../bot/bot.service'
import {CRON_TYPE} from 'src/common/constants'

@Injectable()
export class CronsService {
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
    @InjectRepository(Cron) private readonly cronRepository: Repository<Cron>,
    private readonly botService: BotService,
  ) {
    this.loadExisting()
  }

  async loadExisting() {
    const crons = await this.cronRepository.find()
    crons.forEach(cron => {
      this.start(cron)
    })
  }

  async create(
    user: User,
    expression: string,
    type: CRON_TYPE,
    message?: string,
  ) {
    const cron = this.cronRepository.create({
      expression,
      user,
      type,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.cronRepository.insert(cron)
    this.start(cron)
  }

  async cancel(id: string) {
    this.schedule.cancelJob(id)
    await this.cronRepository.delete(id)
  }

  start(cron: Cron) {
    switch (cron.type) {
      case CRON_TYPE.PLAIN:
        this.schedule.scheduleCronJob(
          cron.id.toString(),
          cron.expression,
          () => {
            this.botService.send(cron.user.name, cron.message)
            return false
          },
        )
        break
      default:
    }
  }
}
