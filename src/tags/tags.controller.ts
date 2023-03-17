import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TagsService } from './tags.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @MessagePattern('add')
  create(@Payload() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  @MessagePattern('all')
  findAll() {
    console.log('findAll in Tags Controller');
    return this.tagsService.findAll();
  }

  @MessagePattern('getByTitle')
  findOne(title) {
    return this.tagsService.findOne(title);
  }

  @MessagePattern('update')
    Update(title, @Payload() tagDto:UpdateTagDto){
      //console.log(tagDto);
      return this.tagsService.update(title,tagDto);
  }


  @MessagePattern('delete')
  remove(title) {
    return this.tagsService.remove(title);
  }
}
