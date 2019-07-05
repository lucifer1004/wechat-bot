import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Unique,
} from 'typeorm'
import {Cron} from '../crons/cron.entity'
import {Activity} from '../activities/activity.entity'

@Entity()
@Unique('username_validation', ['name'])
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Cron, cron => cron.user, {lazy: true})
  crons: Cron[]

  @OneToMany(type => Activity, activity => activity.user, {lazy: true})
  activities: Activity[]

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
