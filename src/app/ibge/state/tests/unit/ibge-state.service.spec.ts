import { Test, TestingModule } from '@nestjs/testing';

import { IbgeConnectorModule, IbgeStateOutput } from '@common/libs/ibge/src';

import { IbgeStateService } from '../../ibge-state.service';

describe('IbgeStateService', () => {
  let service: IbgeStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IbgeConnectorModule],
      providers: [IbgeStateService],
    }).compile();

    service = module.get<IbgeStateService>(IbgeStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should show an array of states', async () => {
      const result: IbgeStateOutput[] = [
        {
          id: 11,
          nome: 'Rondônia',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should show a object of state', async () => {
      const result: IbgeStateOutput = {
        id: 11,
        nome: 'Rondônia',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await service.findOne(11)).toBe(result);
    });
  });
});
