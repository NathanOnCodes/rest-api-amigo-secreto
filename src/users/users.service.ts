import { Delete, Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { HashService } from 'src/auth/hash/hash.service';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService
  ){}
  
  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await this.hashService.hash(createUserDto.password);
      const dataUser = {
        name: createUserDto.name,
        email: createUserDto.email,
        password: passwordHash
      }
      const newUser = this.userRepository.create(dataUser);
      return this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
