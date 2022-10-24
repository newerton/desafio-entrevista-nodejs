import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleType } from './entities/vehicle_type.entity';
import { VehicleTypeController } from './vehicle_type.controller';
import { VehicleTypeRepository } from './vehicle_type.repository';
import { VehicleTypeService } from './vehicle_type.service';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService, VehicleTypeRepository],
})
export class VehicleTypeModule {}
