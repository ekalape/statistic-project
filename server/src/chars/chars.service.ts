import { Injectable } from '@nestjs/common';
import { CreateCharDto } from './dto/create-char.dto';
import { UpdateCharDto } from './dto/update-char.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class CharsService {
  constructor(private readonly db: DbService) { }
  async create(createCharDto: CreateCharDto) {
    const char = await this.db.char.create({
      data: createCharDto
    })
    return char;
  }

  findAll() {
    return `This action returns all chars`;
  }

  findOne(id: string) {
    return `This action returns a #${id} char`;
  }

  update(id: string, updateCharDto: UpdateCharDto) {
    return `This action updates a #${id} char`;
  }

  remove(id: string) {
    return `This action removes a #${id} char`;
  }
}
