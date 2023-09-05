import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { CreateSearchContentService } from './create-search-content/create-search-content.service';
import { FullTextSearchService } from './full-text-search/full-text-search.service';
import { WordBreakerService } from './word-breaker/word-breaker.service';

@Module({
  imports: [RepositoriesModule],
  providers: [
    FullTextSearchService,
    CreateSearchContentService,
    WordBreakerService,
  ],
  exports: [
    FullTextSearchService,
    CreateSearchContentService,
    WordBreakerService,
  ],
})
export class UsecasesModule {}
