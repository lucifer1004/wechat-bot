import {Injectable, BadRequestException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Activity} from './activity.entity'
import {User} from '../users/user.entity'

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private readonly activitiesRepository: Repository<Activity>,
  ) {}

  async start(user: User, type: string) {
    try {
      const time = new Date()
      const newActivity = this.activitiesRepository.create({
        type,
        user,
        createdAt: time,
        endAt: time,
      })
      await this.activitiesRepository.insert(newActivity)
      await this.stopLast(user, time)
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async stopLast(user: User, time: Date) {
    try {
      const lastActivity = await this.activitiesRepository.findOne({
        where: {
          user,
        },
        order: {
          createdAt: 'DESC',
        },
      })
      if (!!lastActivity) {
        await this.activitiesRepository.update(lastActivity.id, {
          ...lastActivity,
          endAt: time,
        })
      }
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
