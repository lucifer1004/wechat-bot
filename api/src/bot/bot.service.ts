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
      setTimeout(() => {
        if (!!this.botNest.qrcode) resolve(this.botNest.qrcode)
        else reject('Timeout')
      }, 5000)
    })
  }
}
