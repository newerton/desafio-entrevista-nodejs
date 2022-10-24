import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { CompanyModule } from '@app/company/company.module';
import { CompanyVacancyModule } from '@app/company_vacancy/company_vacancy.module';
import { IbgeModule } from '@app/ibge/ibge.module';
import { VacancyModule } from '@app/vacancy/vacancy.module';
import { VehicleModule } from '@app/vehicle/vehicle.module';
import { VehicleTypeModule } from '@app/vehicle_type/vehicle_type.module';
import configuration from '@common/config/configuration';
import { databaseConfig } from '@common/config/database';

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
    TypeOrmModule.forRoot(databaseConfig),
    CompanyModule,
    CompanyVacancyModule,
    VacancyModule,
    VehicleModule,
    VehicleTypeModule,
    IbgeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
