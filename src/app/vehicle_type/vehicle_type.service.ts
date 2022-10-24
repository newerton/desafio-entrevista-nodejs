import { Injectable } from '@nestjs/common';

import { CreateVehicleTypeInput } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeInput } from './dto/update-vehicle_type.dto';
import { VehicleType } from './entities/vehicle_type.entity';
import { VehicleTypeRepository } from './vehicle_type.repository';

@Injectable()
export class VehicleTypeService {
  constructor(private readonly repository: VehicleTypeRepository) {}

  async create(createVehicleTypeDto: CreateVehicleTypeInput): Promise<void> {
    return this.repository.createVehicleType(createVehicleTypeDto);
  }

  async findAll(): Promise<VehicleType[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<VehicleType> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    updateVehicleTypeDto: UpdateVehicleTypeInput,
  ): Promise<void> {
    return this.repository.updateVehicleType(id, updateVehicleTypeDto);
  }

  async remove(id: string): Promise<void> {
    return this.repository.deleteVehicleType(id);
  }
}
