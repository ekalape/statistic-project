import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatDto } from './dto/create-stat.dto';
import { UpdateStatDto } from './dto/update-stat.dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class StatsService {

  constructor(private readonly db: DbService) { }

  async create(createStatDto: CreateStatDto) {
    const { date, amount, belongTo } = createStatDto;
    console.log(date)

    return await this.db.earning.create({
      data: { date, amount, belongTo }
    });
  }

  async findAll() {
    return await this.db.earning.findMany({
      include: {
        char: {
          select: {
            name: true,
            server: true
          }
        }
      }
    });
  }

  async findOneByChar(id: string) {
    const char = await this.db.char.findUnique({
      where: { id }
    })
    if (!char) { throw new NotFoundException("The character was not found") }
    const earns = await this.db.earning.findMany({
      where: {
        belongTo: id
      }
    })
    return earns;
  }

  async update(id: string, updateStatDto: UpdateStatDto) {
    const earn = await this.db.earning.update({
      where: { id },
      data: updateStatDto
    })
    if (!earn) { throw new NotFoundException("The record about this earning was not found") }
    return earn;
  }

  async remove(id: string) {
    const earn = await this.db.earning.delete({
      where: { id }
    })
    if (!earn) { throw new NotFoundException("The record about this earning was not found") }
    return earn;
  }
}
