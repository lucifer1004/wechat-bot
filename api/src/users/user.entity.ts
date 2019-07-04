import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm'
import {Cron} from '../crons/cron.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Cron, cron => cron.user, {lazy: true})
  crons: Cron[]

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
