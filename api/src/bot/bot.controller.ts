import {
  Controller,
  Post,
  Delete,
  RequestTimeoutException,
  BadRequestException,
  Get,
} from '@nestjs/common'
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

  @Get()
  bot() {
    return this.botService.user()
  }

  @Delete()
  async stop() {
    try {
      await this.botService.stop()
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
