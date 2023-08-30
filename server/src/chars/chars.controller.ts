import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CreateCharDto } from './dto/create-char.dto';
import { UpdateCharDto } from './dto/update-char.dto';

@Controller('chars')
export class CharsController {
  constructor(private readonly charsService: CharsService) { }

  @Post()
  create(@Body() createCharDto: CreateCharDto) {
    return this.charsService.create(createCharDto);
  }

  @Get()
  findAll() {
    return this.charsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.charsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCharDto: UpdateCharDto) {
    return this.charsService.update(id, updateCharDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.charsService.remove(id);
  }


}
