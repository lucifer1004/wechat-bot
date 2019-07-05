import {Wechaty} from 'wechaty'
import {Interpreter} from 'xstate'
import {BOT_FACTORY, BOT_MACHINE} from '../common/constants'
import {BotMachine} from './bot.machine'

export const BotFactory = {
  provide: BOT_FACTORY,
  useFactory: (botMachine: Interpreter<typeof BotMachine>) => {
    const botNest = {
      bot: new Wechaty(),
      qrcode: undefined,
      userName: undefined,
    }

    botMachine
      .onTransition(state => {
        botNest.qrcode = (state.context as any).qrcode
        botNest.userName = (state.context as any).userName
      })
      .start()

    const onScan = (qrcode: string) => {
      botMachine.send('SCAN', {qrcode})
    }

    const onLogin = () => {
      botMachine.send('LOGIN', {userName: botNest.bot.userSelf().name()})
    }

    const onLogout = () => {
      botMachine.send('LOGOUT')
    }

    const onStop = () => {
      botMachine.send('STOP')
    }

    botNest.bot.on('scan', onScan)
    botNest.bot.on('login', onLogin)
    botNest.bot.on('logout', onLogout)
    botNest.bot.on('stop', onStop)

    return botNest
  },
  inject: [BOT_MACHINE],
}
