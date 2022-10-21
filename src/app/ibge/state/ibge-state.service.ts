import { Inject, Injectable } from '@nestjs/common';

import { IbgeConnectorService, IbgeStateOutput } from '@common/libs/ibge/src';

@Injectable()
export class IbgeStateService {
  constructor(
    @Inject(IbgeConnectorService) private service: IbgeConnectorService,
  ) {}

  async findAll(): Promise<IbgeStateOutput[]> {
    return this.service.findAllStates();
  }

  findOne(id: number): Promise<IbgeStateOutput> {
    return this.service.findOneStates(+id);
  }
}
