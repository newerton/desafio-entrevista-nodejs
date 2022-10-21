import { Module } from '@nestjs/common';

import { IbgeStateModule } from './state/ibge-state.module';

@Module({
  imports: [IbgeStateModule],
})
export class IbgeModule {}
