import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {User} from '../users/user.entity'

@Entity()
export class Cron {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  trigger: string

  @ManyToOne(type => User, {lazy: true})
  user: User

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
