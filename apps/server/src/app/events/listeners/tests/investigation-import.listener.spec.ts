import { Test } from '@nestjs/testing';

import { InvestigationImportListener } from '../investigation-import.listener';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../../entities/tests/entity.mock.spec';
import { Investigation } from '../../../entities/investigation.entity';

describe('Investigation Import Tests', () => {
  let listener: InvestigationImportListener;
  let repositoryMock: MockType<Repository<Investigation>>;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        InvestigationImportListener,
        {
          provide: getRepositoryToken(Investigation),
          useFactory: repositoryMockFactory
        }]
    }).compile();


    listener = app.get<InvestigationImportListener>(InvestigationImportListener);
    repositoryMock = app.get(getRepositoryToken(Investigation));
  });

  /**
   * @todo: implement listener tests
   */
  it.todo('implement listener tests');
});
