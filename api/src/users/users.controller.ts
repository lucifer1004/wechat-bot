import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {Request} from 'express'
import {User} from './user.entity'
import {CreateUserDto, UpdateUserDto} from './user.dto'
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto)
    if (!!user) {
      return user
    }
    throw new BadRequestException()
  }

  @Get()
  async findAll(@Req() request: Request): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findById(id)
    if (!!user) {
      return user
    }
    throw new NotFoundException(id)
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.usersService.update(id, updateUserDto)
    if (!!user) {
      return user
    }
    throw new BadRequestException()
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.usersService.delete(id)
    } catch (e) {
      throw new BadRequestException()
    }
  }
}
