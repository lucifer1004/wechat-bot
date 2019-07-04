import {Inject, Injectable} from '@nestjs/common'
import {Wechaty} from 'wechaty'
import {WECHATY_BOT} from '../common/constants'

@Injectable()
export class BotService {
  constructor(
    @Inject(WECHATY_BOT)
    private readonly botNest: {
      bot: Wechaty
      qrcode: string
    },
  ) {}

  start(): Promise<string> {
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
}
