import { Test, TestingModule } from '@nestjs/testing';
import { WordBreakerService } from './word-breaker.service';

describe('WordBreakerService', () => {
  let service: WordBreakerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordBreakerService],
    }).compile();

    service = module.get<WordBreakerService>(WordBreakerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
