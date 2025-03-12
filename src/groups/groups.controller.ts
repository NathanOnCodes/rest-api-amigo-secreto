import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';



@Controller('api/friends/group/')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService
  ){}

  @Post()
  create(@Req() req, @Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(req.user.id, createGroupDto);
  }

}
