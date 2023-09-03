import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UsePipes, ValidationPipe, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CreateCharDto } from './dto/create-char.dto';
import { UpdateCharDto } from './dto/update-char.dto';
import { ExistingCharValidationInterceptor } from 'src/interceptors/existingChar.interceptor';



@Controller('chars')
export class CharsController {
  constructor(private readonly charsService: CharsService) { }

  //@UsePipes(new ValidationPipe())
  @Post()
  @UseInterceptors(ExistingCharValidationInterceptor)
  create(@Body() createCharDto: CreateCharDto) {
    return this.charsService.create(createCharDto);
  }

  @Get()
  findAll() {
    return this.charsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.charsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCharDto: UpdateCharDto) {
    return this.charsService.update(id, updateCharDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.charsService.remove(id);
  }


}
