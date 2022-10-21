import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { CompanyModule } from '@app/company/company.module';
import { IbgeModule } from '@app/ibge/ibge.module';
import { VehicleModule } from '@app/vehicle/vehicle.module';

import { AppModule } from './app.module';

describe('AppModule', () => {
  it('should compile the module', async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    expect(module).toBeDefined();
    expect(module.get(ConfigModule)).toBeInstanceOf(ConfigModule);
    expect(module.get(CompanyModule)).toBeInstanceOf(CompanyModule);
    expect(module.get(VehicleModule)).toBeInstanceOf(VehicleModule);
    expect(module.get(IbgeModule)).toBeInstanceOf(IbgeModule);
  });
});
