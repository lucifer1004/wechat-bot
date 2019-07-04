import {Controller, Post, RequestTimeoutException} from '@nestjs/common'
import {BotService} from './bot.service'

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  async start() {
    try {
      const qrcode = await this.botService.start()
      return {qrcode}
    } catch (e) {
      throw new RequestTimeoutException()
    }
  }
}
