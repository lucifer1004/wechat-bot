import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {InjectSchedule, Schedule} from 'nest-schedule'
import {Repository} from 'typeorm'
import {Cron} from './cron.entity'
import {User} from '../users/user.entity'

@Injectable()
export class CronsService {
  constructor(
    @InjectSchedule() private readonly schedule: Schedule,
    @InjectRepository(Cron) private readonly cronRepository: Repository<Cron>,
  ) {}

  async create(
    user: User,
    expression: string,
    job: () => boolean | Promise<boolean>,
  ) {
    const cron = this.cronRepository.create({
      expression,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.cronRepository.insert(cron)
    this.schedule.scheduleCronJob(cron.id.toString(), expression, job)
  }

  async cancel(id: string) {
    this.schedule.cancelJob(id)
    await this.cronRepository.delete(id)
  }
}
