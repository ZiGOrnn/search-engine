import { Injectable } from '@nestjs/common';
import { SearchEntity } from '../../database/entities/search.entity';
import { CreateSearchDto } from '../../modules/search/dto/create-search.dto';
import { SearchRepositoryService } from '../../repositories/search-repository/search-repository.service';
import { WordBreakerService } from '../word-breaker/word-breaker.service';
interface Segmenter {
  segment: string;
  index: number;
  input: string;
  isWordLike: boolean;
}

@Injectable()
export class CreateSearchContentService {
  constructor(
    private readonly searchRepositoryService: SearchRepositoryService,
    private readonly wordBreakerService: WordBreakerService,
  ) {}

  async execute(payload: CreateSearchDto): Promise<SearchEntity> {
    const word = this.wordBreakerService.execute(payload.content);

    const searchEntity = new SearchEntity();
    searchEntity.content = payload.content;
    searchEntity.search = word;
    const searchContent = await this.searchRepositoryService.save(searchEntity);
    return searchContent;
  }
}
