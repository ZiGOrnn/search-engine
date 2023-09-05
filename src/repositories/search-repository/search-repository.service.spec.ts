import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchEntity } from '../../database/entities/search.entity';
import { SearchRepositoryService } from './search-repository.service';

describe('SearchRepositoryService', () => {
  let service: SearchRepositoryService;
  let searchEntityRepository: Repository<SearchEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchRepositoryService,
        {
          provide: getRepositoryToken(SearchEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SearchRepositoryService>(SearchRepositoryService);
    searchEntityRepository = module.get<Repository<SearchEntity>>(
      getRepositoryToken(SearchEntity),
    );
  });

  it('CreateSearchContent_Save_ShouldSaveSearchContent', async () => {
    // Arrange
    const searchEntity: SearchEntity = {
      content: 'example content',
      id: 'b68d2343-c560-421d-a8a2-416909d6b0ef',
      created_at: new Date('2023-07-04T03:08:57.230Z'),
      updated_at: new Date('2023-07-04T03:08:57.230Z'),
      deleted_at: null,
    };

    jest
      .spyOn(searchEntityRepository, 'save')
      .mockResolvedValueOnce(searchEntity);

    // Act
    const result = await service.save(searchEntity);

    // Assert
    expect(searchEntityRepository.save).toHaveBeenCalledTimes(1);
    expect(searchEntityRepository.save).toHaveBeenCalledWith(searchEntity);
    expect(result).toEqual(searchEntity);
  });

  it('CreateSearchContent_Save_ShouldSaveError', async () => {
    // Arrange
    const expectedError = new Error('Async error');
    const searchEntity: SearchEntity = {
      content: 'example content',
      id: 'b68d2343-c560-421d-a8a2-416909d6b0ef',
      created_at: new Date('2023-07-04T03:08:57.230Z'),
      updated_at: new Date('2023-07-04T03:08:57.230Z'),
      deleted_at: null,
    };
    let error: Error;

    jest.spyOn(searchEntityRepository, 'save').mockRejectedValue(expectedError);

    // Act
    try {
      await service.save(searchEntity);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(searchEntityRepository.save).toHaveBeenCalledTimes(1);
    expect(searchEntityRepository.save).toHaveBeenCalledWith(searchEntity);
    expect(error).toEqual(expectedError);
  });

  it('SearchContentByKeyword_Search_ShouldContent', async () => {
    // Arrange
    const keyword = 'example keyword';
    const tsQuery = 'example & keyword:*';
    const entities: SearchEntity[] = [
      {
        content: 'example content',
        id: 'b68d2343-c560-421d-a8a2-416909d6b0ef',
        created_at: new Date('2023-07-04T03:08:57.230Z'),
        updated_at: new Date('2023-07-04T03:08:57.230Z'),
        deleted_at: null,
      },
    ];

    jest.spyOn(searchEntityRepository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValueOnce(entities),
    } as any);

    // Act
    const result = await service.search(keyword);

    // Assert
    expect(searchEntityRepository.createQueryBuilder).toHaveBeenCalledWith('c');
    expect(
      searchEntityRepository.createQueryBuilder().where,
    ).toHaveBeenCalledWith('c.content @@ to_tsquery(:tsQuery)', { tsQuery });
    expect(
      searchEntityRepository.createQueryBuilder().getMany,
    ).toHaveBeenCalled();
    expect(result).toEqual(entities);
  });

  it('SearchContentByKeyword_Search_ShouldError', async () => {
    // Arrange
    const keyword = 'example keyword';
    const tsQuery = 'example & keyword:*';
    const expectedError = new Error('Async error');
    let error: Error;

    jest.spyOn(searchEntityRepository, 'createQueryBuilder').mockReturnValue({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockRejectedValueOnce(expectedError),
    } as any);

    // Act
    try {
      await service.search(keyword);
    } catch (err) {
      error = err;
    }

    // Assert
    expect(searchEntityRepository.createQueryBuilder).toHaveBeenCalledWith('c');
    expect(
      searchEntityRepository.createQueryBuilder().where,
    ).toHaveBeenCalledWith('c.content @@ to_tsquery(:tsQuery)', { tsQuery });
    expect(
      searchEntityRepository.createQueryBuilder().getMany,
    ).toHaveBeenCalled();
    expect(error).toEqual(expectedError);
  });
});
