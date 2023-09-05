import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post()
  create(@Body() createSearchDto: CreateSearchDto) {
    return this.searchService.create(createSearchDto);
  }

  @Get()
  // @ApiBearerAuth(Security.Token)
  // @ApiSecurity(Security.ApiKey)
  // @ApiSecurity(Security.ApiVersion)
  searchContent(@Query() searchDto: SearchDto) {
    return this.searchService.searchContent(searchDto);
  }
}
