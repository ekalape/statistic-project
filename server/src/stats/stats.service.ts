import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';

@Injectable()
export class StatsService {
  create(createStatDto: CreateStatDto) {
    return 'This action adds a new stat';
  }

  findAll() {
    console.log("stats again")
    return `This action returns all stats`;
  }

  findOne(id: string) {
    return `This action returns a #${id} stat`;
  }

  update(id: string, updateStatDto: UpdateStatDto) {
    return `This action updates a #${id} stat`;
  }

  remove(id: string) {
    return `This action removes a #${id} stat`;
  }
}
