import { Injectable } from '@nestjs/common';
import { CreateSearchContentService } from '../../usecases/create-search-content/create-search-content.service';
import { FullTextSearchService } from '../../usecases/full-text-search/full-text-search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchDto } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    private readonly createSearchContentService: CreateSearchContentService,
    private readonly fullTextSearchService: FullTextSearchService,
  ) {}

  async create(createSearchDto: CreateSearchDto) {
    try {
      return await this.createSearchContentService.execute(createSearchDto);
    } catch (error) {
      throw error;
    }
  }

  async searchContent(searchDto: SearchDto) {
    try {
      return await this.fullTextSearchService.execute(searchDto.search);
    } catch (error) {
      throw error;
    }
  }
}
