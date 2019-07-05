import {Inject, Injectable} from '@nestjs/common'
import {BotFactory} from './bot.factory'

@Injectable()
export class BotService {
  constructor(
    @Inject(BotFactory)
    private readonly botFactory: BotFactory,
  ) {}

  async start(): Promise<string> {
    this.botFactory.start()
    return new Promise((resolve, reject) => {
      let count = 0
      setInterval(() => {
        if (!!this.botFactory.code()) resolve(this.botFactory.code())
        count++
        if (count > 30) reject('Timeout')
      }, 1000)
    })
  }

  user() {
    return {
      name: this.botFactory.name(),
    }
  }

  async stop() {
    await this.botFactory.stop()
  }
}
