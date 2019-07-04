import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User} from './user.entity'
import {CreateUserDto, UpdateUserDto} from './user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.usersRepository.create({
        name: createUserDto.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      await this.usersRepository.insert(newUser)
      return newUser
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async delete(id: string) {
    try {
      await this.usersRepository.delete({id: parseInt(id, 10)})
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.findOne({id: parseInt(id, 10)})
      if (!user) {
        throw new NotFoundException(id)
      }
      const updatedUser = {
        ...user,
        name: updateUserDto.name,
        updatedAt: new Date(),
      }
      await this.usersRepository.update(id, updatedUser)
      return updatedUser
    } catch (e) {
      throw new BadRequestException()
    }
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({id: parseInt(id, 10)})
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }
}
