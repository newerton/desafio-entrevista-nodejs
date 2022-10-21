import { Module } from '@nestjs/common';

import { IbgeConnectorModule } from '@common/libs/ibge/src';

import { IbgeStateController } from './ibge-state.controller';
import { IbgeStateService } from './ibge-state.service';

@Module({
  imports: [IbgeConnectorModule],
  controllers: [IbgeStateController],
  providers: [IbgeStateService],
})
export class IbgeStateModule {}
