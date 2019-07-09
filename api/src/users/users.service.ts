import {Injectable, NotFoundException, Inject} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {AWAKE} from '../common/constants'
import {User} from './user.entity'
import {CreateUserDto, UpdateUserDto} from './user.dto'
import {ActivitiesService} from '../activities/activities.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(ActivitiesService)
    private readonly activitiesService: ActivitiesService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.usersRepository.create({
      name: createUserDto.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.usersRepository.insert(newUser)
    await this.activitiesService.start(newUser, AWAKE)
    return newUser
  }

  async delete(id: string) {
    await this.usersRepository.delete({id: parseInt(id, 10)})
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id)
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
  }

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({id: parseInt(id, 10)})
  }

  async findByName(name: string): Promise<User> {
    return await this.usersRepository.findOne({name})
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }
}
