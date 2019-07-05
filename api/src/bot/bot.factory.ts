import {Injectable} from '@nestjs/common'
import {Wechaty, Message} from 'wechaty'
import {interpret, Interpreter} from 'xstate'
import {BotMachine} from './bot.machine'
import {UsersService} from '../users/users.service'

@Injectable()
export class BotFactory {
  constructor(private readonly usersService: UsersService) {
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
    if (name !== this.userName) {
      await this.usersService.findOrCreate(name)
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
