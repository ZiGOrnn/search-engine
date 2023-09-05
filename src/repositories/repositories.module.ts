import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { SearchEntity } from '../database/entities/search.entity';
import { SearchRepositoryService } from './search-repository/search-repository.service';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([SearchEntity])],
  providers: [SearchRepositoryService],
  exports: [SearchRepositoryService],
})
export class RepositoriesModule {}
