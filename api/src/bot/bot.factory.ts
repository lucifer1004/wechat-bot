import {Injectable} from '@nestjs/common'
import {Wechaty, Message} from 'wechaty'
import {interpret, Interpreter} from 'xstate'
import {BotMachine} from './bot.machine'
import {UsersService} from '../users/users.service'
import {CronsService} from '../crons/crons.service'
import {SUBSCRIBE_CN} from '../common/constants'

@Injectable()
export class BotFactory {
  constructor(
    private readonly usersService: UsersService,
    private readonly cronsService: CronsService,
  ) {
    this.botMachine = interpret(BotMachine)
      .onTransition(state => {
        this.qrcode = (state.context as any).qrcode
        this.userName = (state.context as any).userName
      })
      .start()

    this.bot = new Wechaty()
    this.bot.on('scan', this.onScan.bind(this))
    this.bot.on('login', this.onLogin.bind(this))
    this.bot.on('message', this.onMessage.bind(this))
    this.bot.on('logout', this.onLogout.bind(this))
    this.bot.on('stop', this.onStop.bind(this))
    this.bot.on('error', this.onError)
  }

  private bot: Wechaty
  private qrcode: string
  private userName: string
  private botMachine: Interpreter<any>

  onScan(qrcode: string) {
    this.botMachine.send('SCAN', {qrcode})
  }

  onLogin() {
    this.botMachine.send('LOGIN', {userName: this.bot.userSelf().name()})
  }

  async onMessage(msg: Message) {
    const name = msg.from().name()
    const text = msg.text()
    if (name !== this.userName) {
      const user = await this.usersService.findByName(name)
      if (!user && text === SUBSCRIBE_CN) {
        this.usersService.create({name})
      }
      if (user && text === '定时') {
        this.cronsService.create(user, '*/20 * * * * *', async () => {
          await msg.from().say('哈哈😀')
          return false
        })
      }
    }
  }

  onLogout() {
    this.botMachine.send('LOGOUT')
  }

  onStop() {
    this.botMachine.send('STOP')
  }

  onError(e) {
    console.error(e)
  }

  start() {
    this.bot.start()
  }

  stop() {
    this.bot.stop()
  }

  name() {
    return this.userName
  }

  code() {
    return this.qrcode
  }
}
