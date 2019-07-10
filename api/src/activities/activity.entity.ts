import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm'
import {User} from '../users/user.entity'

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  type: string

  @ManyToOne(type => User, {lazy: true})
  user: User | Promise<User>

  @Column()
  createdAt: Date

  @Column()
  endAt: Date
}
