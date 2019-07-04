import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common'
import {Request} from 'express'
import {User} from './user.entity'
import {CreateUserDto, UpdateUserDto} from './user.dto'
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(@Req() request: Request): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOnes(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.usersService.delete(id)
  }
}
