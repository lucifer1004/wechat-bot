import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {UsersService} from './users.service'
import {UsersController} from './users.controller'
import {User} from './user.entity'
import {ActivitiesModule} from '../activities/activities.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), ActivitiesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
