import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { IbgeConnectorService } from './ibge-connector.service';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades',
    }),
  ],
  providers: [IbgeConnectorService],
  exports: [IbgeConnectorService],
})
export class IbgeConnectorModule {}
