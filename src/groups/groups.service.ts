import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(userId: number, CreateGroupDto: CreateGroupDto): Promise<Group> {
    const owner = await this.userRepository.findOne({where: {id: userId}});
  
  const group = this.groupRepository.create({
    name: CreateGroupDto.name,
    owner,
    participants: CreateGroupDto.participants || [],
  });
  
  return this.groupRepository.save(group);
  }

  async findOne(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['wishlist']
    });
  }

  async addParticipant(groupId: number, newParticipant: {name: string, email: string}){
    const group = await this.getGroupById(groupId);
    if(!group) throw new NotFoundException('Grupo não encontrado');
    group.participants.push(newParticipant);
    return this.groupRepository.save(group);
  }
  
  async getGroupById(groupId: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id: groupId },
      relations: ['owner'],
    });

    if (!group) throw new NotFoundException('Grupo não encontrado');
    return group;
  }


}
