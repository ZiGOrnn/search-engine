import { Test, TestingModule } from '@nestjs/testing';
import { SearchEntity } from '../../database/entities/search.entity';
import { CreateSearchContentService } from '../../usecases/create-search-content/create-search-content.service';
import { FullTextSearchService } from '../../usecases/full-text-search/full-text-search.service';
import { UsecasesModule } from '../../usecases/usecases.module';
import { CreateSearchDto } from './dto/create-search.dto';
import { SearchDto } from './dto/search.dto';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service: SearchService;
  let createSearchContentService: CreateSearchContentService;
  let fullTextSearchService: FullTextSearchService;
  let createSearchContentServiceSpy: jest.SpyInstance;
  let fullTextSearchServiceSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsecasesModule],
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
    createSearchContentService = module.get<CreateSearchContentService>(
      CreateSearchContentService,
    );
    fullTextSearchService = module.get<FullTextSearchService>(
      FullTextSearchService,
    );

    createSearchContentServiceSpy = jest.spyOn(
      createSearchContentService,
      'execute',
    );
    fullTextSearchServiceSpy = jest.spyOn(fullTextSearchService, 'execute');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('CreateSearch_Create_ShouldSearchContent', async () => {
    // Arrange
    const createSearchDto: CreateSearchDto = {
      content: '',
    };
    const expectedResult: SearchEntity = {
      id: '9fa15125-4275-4df9-986a-18beb6f6b1b7',
      content: createSearchDto.content,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    createSearchContentServiceSpy.mockResolvedValue(expectedResult);

    // Act
    const result = await service.create(createSearchDto);

    // Assert
    expect(createSearchContentService.execute).toHaveBeenCalledWith(
      createSearchDto,
    );
    expect(createSearchContentService.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('CreateSearch_Create_ShouldErrorCreateSearch', async () => {
    // Arrange
    const expectedError = new Error('Async error');
    const createSearchDto: CreateSearchDto = {
      content: '',
    };
    let error: Error;

    createSearchContentServiceSpy.mockRejectedValue(expectedError);

    // Act
    try {
      await service.create(createSearchDto);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(createSearchContentService.execute).toHaveBeenCalledWith(
      createSearchDto,
    );
    expect(createSearchContentService.execute).toHaveBeenCalledTimes(1);
    expect(error).toEqual(expectedError);
  });

  it('SearchContentByText_SearchContent_ShouldSearchContent', async () => {
    // Arrange
    const searchDto: SearchDto = {
      search: 'voluptatem',
    };
    const expectedResult: SearchEntity = {
      id: '9fa15125-4275-4df9-986a-18beb6f6b1b7',
      content:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };

    fullTextSearchServiceSpy.mockResolvedValue(expectedResult);

    // Act
    const result = await service.searchContent(searchDto);

    // Assert
    expect(fullTextSearchService.execute).toHaveBeenCalledWith(
      searchDto.search,
    );
    expect(fullTextSearchService.execute).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expectedResult);
  });

  it('SearchContentByText_SearchContent_ShouldErrorSearchContent', async () => {
    // Arrange
    const expectedError = new Error('Async error');
    const searchDto: SearchDto = {
      search: 'voluptatem',
    };
    let error: Error;

    fullTextSearchServiceSpy.mockRejectedValue(expectedError);

    // Act
    try {
      await service.searchContent(searchDto);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(fullTextSearchService.execute).toHaveBeenCalledWith(
      searchDto.search,
    );
    expect(fullTextSearchService.execute).toHaveBeenCalledTimes(1);
    expect(error).toEqual(expectedError);
  });
});
