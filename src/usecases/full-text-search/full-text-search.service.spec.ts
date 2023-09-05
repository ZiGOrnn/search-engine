import { Test, TestingModule } from '@nestjs/testing';
import { SearchEntity } from '../../database/entities/search.entity';
import { SearchRepositoryService } from '../../repositories/search-repository/search-repository.service';
import { FullTextSearchService } from './full-text-search.service';

describe('FullTextSearchService', () => {
  let service: FullTextSearchService;
  let searchRepositoryService: SearchRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FullTextSearchService,
        {
          provide: SearchRepositoryService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FullTextSearchService>(FullTextSearchService);
    searchRepositoryService = module.get<SearchRepositoryService>(
      SearchRepositoryService,
    );
  });

  it('FullTextSearch_Execute_ShouldSearchEntity', async () => {
    // Arrange
    const search = 'omnis iste natus';
    const searchEntity: SearchEntity[] = [
      {
        id: '9fa15125-4275-4df9-986a-18beb6f6b1b7',
        content:
          'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ];

    jest
      .spyOn(searchRepositoryService, 'search')
      .mockResolvedValue(searchEntity);

    // Act
    const result = await service.execute(search);

    // Assert
    expect(searchRepositoryService.search).toHaveBeenCalledTimes(1);
    expect(searchRepositoryService.search).toHaveBeenCalledWith(search);
    expect(result).toEqual(searchEntity);
  });

  it('FullTextSearch_Execute_ShouldError', async () => {
    // Arrange
    const expectedError = new Error('Async error');
    const search = 'omnis iste natus';
    let error: Error;

    jest
      .spyOn(searchRepositoryService, 'search')
      .mockRejectedValue(expectedError);

    // Act
    try {
      await service.execute(search);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(searchRepositoryService.search).toHaveBeenCalledTimes(1);
    expect(searchRepositoryService.search).toHaveBeenCalledWith(search);
    expect(error).toEqual(expectedError);
  });
});
