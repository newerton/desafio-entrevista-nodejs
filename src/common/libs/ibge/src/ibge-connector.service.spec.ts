import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { IbgeConnectorService } from './ibge-connector.service';

describe('IbgeService', () => {
  let service: IbgeConnectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule.register({
          baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
        }),
      ],
      providers: [IbgeConnectorService],
    }).compile();

    service = module.get<IbgeConnectorService>(IbgeConnectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
