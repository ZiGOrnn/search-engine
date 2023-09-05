import { Injectable } from '@nestjs/common';
import { SearchRepositoryService } from '../../repositories/search-repository/search-repository.service';
import { WordBreakerService } from '../word-breaker/word-breaker.service';

@Injectable()
export class FullTextSearchService {
  constructor(
    private readonly searchRepositoryService: SearchRepositoryService,
    private readonly wordBreakerService: WordBreakerService,
  ) {}

  async execute(search: string) {
    const word = this.wordBreakerService.execute(search, ' & ');
    const result = await this.searchRepositoryService.search(word);
    return result;
  }
}
