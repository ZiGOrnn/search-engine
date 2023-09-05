import { Test, TestingModule } from '@nestjs/testing';
import { SearchEntity } from '../../database/entities/search.entity';
import { CreateSearchDto } from '../../modules/search/dto/create-search.dto';
import { SearchRepositoryService } from '../../repositories/search-repository/search-repository.service';
import { CreateSearchContentService } from './create-search-content.service';

describe('CreateSearchContentService', () => {
  let service: CreateSearchContentService;
  let searchRepositoryService: SearchRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateSearchContentService,
        {
          provide: SearchRepositoryService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CreateSearchContentService>(
      CreateSearchContentService,
    );
    searchRepositoryService = module.get<SearchRepositoryService>(
      SearchRepositoryService,
    );
  });

  it('CreateSearch_Execute_ShouldSearchEntity', async () => {
    // Arrange
    const payload: CreateSearchDto = {
      content: 'Test content',
    };
    const searchEntity = new SearchEntity();

    searchEntity.content = payload.content;

    jest.spyOn(searchRepositoryService, 'save').mockResolvedValue(searchEntity);

    // Act
    const result = await service.execute(payload);

    // Assert
    expect(searchRepositoryService.save).toHaveBeenCalledTimes(1);
    expect(searchRepositoryService.save).toHaveBeenCalledWith(searchEntity);
    expect(result).toEqual(searchEntity);
  });

  it('CreateSearch_Execute_ShouldError', async () => {
    // Arrange
    const expectedError = new Error('Async error');
    const searchEntity = new SearchEntity();
    const payload: CreateSearchDto = {
      content: 'Test content',
    };
    let error: Error;

    searchEntity.content = payload.content;

    jest
      .spyOn(searchRepositoryService, 'save')
      .mockRejectedValue(expectedError);

    // Act
    try {
      await service.execute(payload);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(searchRepositoryService.save).toHaveBeenCalledTimes(1);
    expect(searchRepositoryService.save).toHaveBeenCalledWith(searchEntity);
    expect(error).toEqual(expectedError);
  });
});
