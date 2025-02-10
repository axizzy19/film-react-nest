import { Test, TestingModule } from '@nestjs/testing';
import { FilmsPostgreSqlService } from './filmsPostgreSql.service';

describe('FilmsPostgreSqlService', () => {
  let service: FilmsPostgreSqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsPostgreSqlService],
    }).compile();

    service = module.get<FilmsPostgreSqlService>(FilmsPostgreSqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
