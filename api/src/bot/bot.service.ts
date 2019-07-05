import {Inject, Injectable} from '@nestjs/common'
import {Wechaty} from 'wechaty'
import {BOT_FACTORY} from '../common/constants'

@Injectable()
export class BotService {
  constructor(
    @Inject(BOT_FACTORY)
    private readonly botNest: {
      bot: Wechaty
      qrcode: string
      userName: string
    },
  ) {}

  async start(): Promise<string> {
    this.botNest.bot.start()
    return new Promise((resolve, reject) => {
      let count = 0
      setInterval(() => {
        if (!!this.botNest.qrcode) resolve(this.botNest.qrcode)
        count++
        if (count > 30) reject('Timeout')
      }, 1000)
    })
  }

  user() {
    return {
      name: this.botNest.userName,
    }
  }

  async stop() {
    await this.botNest.bot.stop()
  }
}
