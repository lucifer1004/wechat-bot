import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Connection} from 'typeorm'
import * as dotenv from 'dotenv'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {BotModule} from './bot/bot.module'
import {UsersModule} from './users/users.module'

dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT, 10),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: true,
      ssl: process.env.PG_SSL === 'true',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UsersModule,
    BotModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
