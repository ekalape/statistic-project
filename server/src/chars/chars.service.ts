import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return await this.db.char.findMany({
      include: {
        earnings: {
          select: { amount: true }
        }
      }
    });
  }

  async findOne(id: string) {
    const char = await this.db.char.findUnique({
      where: {
        id
      },
      include: {
        earnings: {
          select: { amount: true }
        }
      }
    })
    if (!char) { throw new NotFoundException("The character was not found") };
    return char;
  }

  async update(id: string, updateCharDto: UpdateCharDto) {
    const char = await this.db.char.update({
      where: {
        id
      },
      data: updateCharDto
    })
    if (!char) { throw new NotFoundException("The character was not found") };
    return char;
  }

  async remove(id: string) {
    const char = await this.db.char.delete({
      where: {
        id
      }
    })
    if (!char) { throw new NotFoundException("The character was not found") };
    return char;
  }
}
