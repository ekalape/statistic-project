import { Test, TestingModule } from '@nestjs/testing';
import { CharsController } from './chars.controller';
import { CharsService } from './chars.service';

describe('CharsController', () => {
  let controller: CharsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CharsController],
      providers: [CharsService],
    }).compile();

    controller = module.get<CharsController>(CharsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
