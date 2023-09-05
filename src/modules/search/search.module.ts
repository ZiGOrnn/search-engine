import { Module } from '@nestjs/common';
import { UsecasesModule } from '../../usecases/usecases.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [UsecasesModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
