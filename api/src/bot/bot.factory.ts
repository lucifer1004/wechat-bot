import {Wechaty} from 'wechaty'
import {WECHATY_BOT} from '../common/constants'

export const BotFactory = {
  provide: WECHATY_BOT,
  useFactory: () => {
    const botNest = {
      bot: new Wechaty(),
      qrcode: undefined,
    }

    const onScan = (qrcode: string) => {
      botNest.qrcode = qrcode
      console.log(qrcode)
    }

    botNest.bot.on('scan', onScan)

    return botNest
  },
}
