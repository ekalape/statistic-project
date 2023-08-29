import { Test, TestingModule } from '@nestjs/testing';
import { CharsService } from './chars.service';

describe('CharsService', () => {
  let service: CharsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharsService],
    }).compile();

    service = module.get<CharsService>(CharsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
