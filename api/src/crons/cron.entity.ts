import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {User} from '../users/user.entity'

@Entity()
export class Cron {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  expression: string

  @ManyToOne(type => User, {lazy: true})
  user: User

  @Column()
  type: number

  @Column({nullable: true})
  message?: string

  @Column()
  createdAt: Date

  @Column()
  updatedAt: Date
}
