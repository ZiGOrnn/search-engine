import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchEntity } from '../../database/entities/search.entity';

@Injectable()
export class SearchRepositoryService {
  constructor(
    @InjectRepository(SearchEntity)
    private readonly searchEntityRepository: Repository<SearchEntity>,
  ) {}

  async save(body: SearchEntity) {
    const entity = await this.searchEntityRepository.save(body);
    return entity;
  }

  async search(keyword: string) {
    const entity = await this.searchEntityRepository
      .createQueryBuilder('c')
      .where('c.search @@ to_tsquery(:tsQuery)', {
        tsQuery: keyword,
      })
      .select(['c.id', 'c.created_at', 'c.updated_at', 'c.content'])
      .getMany();

    return entity;
  }
}
