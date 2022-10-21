import { Test, TestingModule } from '@nestjs/testing';

import { IbgeConnectorModule, IbgeStateOutput } from '@common/libs/ibge/src';

import { IbgeStateController } from '../../ibge-state.controller';
import { IbgeStateService } from '../../ibge-state.service';

describe('IbgeStateController', () => {
  let controller: IbgeStateController;
  let service: IbgeStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [IbgeConnectorModule],
      controllers: [IbgeStateController],
      providers: [IbgeStateService],
    }).compile();

    controller = module.get<IbgeStateController>(IbgeStateController);
    service = module.get<IbgeStateService>(IbgeStateService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of states', async () => {
      const result: IbgeStateOutput[] = [
        {
          id: 11,
          nome: 'Rondônia',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a object of state', async () => {
      const result: IbgeStateOutput = {
        id: 11,
        nome: 'Rondônia',
      };
      jest.spyOn(service, 'findOne').mockImplementation(async () => result);

      expect(await controller.findOne(11)).toBe(result);
    });
  });
});
