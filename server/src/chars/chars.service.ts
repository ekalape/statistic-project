import { Injectable } from '@nestjs/common';
import { CreateCharDto } from './dto/create-char.dto';
import { UpdateCharDto } from './dto/update-char.dto';

@Injectable()
export class CharsService {
  create(createCharDto: CreateCharDto) {
    return 'This action adds a new char';
  }

  findAll() {
    return `This action returns all chars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} char`;
  }
  findByName(charName: string) {
    return `This action returns a #${charName} char`;
  }
  findByServ(serv: string) {
    return `This action returns a #${serv} char`;
  }

  update(id: number, updateCharDto: UpdateCharDto) {
    return `This action updates a #${id} char`;
  }

  remove(id: number) {
    return `This action removes a #${id} char`;
  }
}
