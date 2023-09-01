import { Injectable } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class StatsService {

  constructor(private readonly db: DbService) { }

  create(createStatDto: CreateStatDto) {
    return 'This action adds a new stat';
  }

  async findAll() {
    console.log("earnings")
    return await this.db.earning.findMany();
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
