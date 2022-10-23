import { Injectable } from '@nestjs/common';

import { CreateVehicleInput } from './dto/create-vehicle.dto';
import { UpdateVehicleInput } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleRepository } from './vehicle.repository';

@Injectable()
export class VehicleService {
  constructor(private readonly repository: VehicleRepository) {}

  async create(createVehicleDto: CreateVehicleInput): Promise<void> {
    return this.repository.createVehicle(createVehicleDto);
  }

  async findAll(): Promise<Vehicle[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    updateVehicleDto: UpdateVehicleInput,
  ): Promise<void> {
    return this.repository.updateVehicle(id, updateVehicleDto);
  }

  async remove(id: string): Promise<void> {
    return this.repository.deleteVehicle(id);
  }
}
