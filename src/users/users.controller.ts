import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HashService } from 'src/auth/hash/hash.service';

@Controller('api/friends/users/')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashServiice: HashService
  ) {}

  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
    const responseUserCreated = {
      name: createUserDto.name,
      email: createUserDto.email
    }
    return responseUserCreated;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
