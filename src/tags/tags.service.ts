import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
 import { Request, response, Response } from 'express';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {

  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) { }

  async create(createTagDto: CreateTagDto)  {

    const t=await this.findOne(createTagDto.title);
    if (t != null || t != undefined)
      {
        return new HttpException('Tag already exists with title '+createTagDto.title,HttpStatus.FORBIDDEN);
      }
      else

{    return new this.tagModel(createTagDto).save();
 }
 }

  async findAll() {
    return this.tagModel.find();
  }

  async findOne(title: string) {
    return this.tagModel.findOne({ title });
  }

  async update(title: string,tagDto:UpdateTagDto){
    console.log("---title ----")
    console.log(tagDto['tagDto']['title'])
const newTitle=tagDto.title;
  const t=await this.findOne(newTitle);

  const y=await this.findOne(tagDto['tagDto']['title']);

  if(  (y!=null || y!=undefined)  &&  (newTitle != tagDto['tagDto']['title'])  )
  {
return new HttpException('Tag already exists with title '+tagDto['tagDto']['title'], HttpStatus.FORBIDDEN);
  }
  else
  {
   t.title=tagDto['tagDto']['title'];
   t.type=tagDto['tagDto']['type'];
   // console.log("tagDto ----"+tagDto)
  
   console.log("----- tag DTO--------")
   console.log(t)
   

   return   this.tagModel.updateOne({ title:newTitle },{ $set: t });
  }}

  async remove(title: string) {
    return this.tagModel.deleteOne({ title });
  }
}
