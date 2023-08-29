import { Module } from '@nestjs/common';
import { CharsService } from './chars.service';
import { CharsController } from './chars.controller';

@Module({
  controllers: [CharsController],
  providers: [CharsService]
})
export class CharsModule {}
