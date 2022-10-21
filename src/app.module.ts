import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import configuration from '@common/config/configuration';

import { CompanyModule } from './app/company/company.module';
import { VehicleModule } from './app/vehicle/vehicle.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_LOGGING: Joi.boolean().required(),
      }),
    }),
    CompanyModule,
    VehicleModule,
  ],
})
export class AppModule {}
