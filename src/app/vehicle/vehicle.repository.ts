import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateVehicleInput } from './dto/create-vehicle.dto';
import { UpdateVehicleInput } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
@Injectable()
export class VehicleRepository extends Repository<Vehicle> {
  constructor(private dataSource: DataSource) {
    super(
      Vehicle,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createVehicle(createVehicleDto: CreateVehicleInput): Promise<void> {
    const {
      vehicle_type_id,
      type,
      brand,
      model,
      color,
      license_plate,
      passenger_capacity,
      is_active,
    } = createVehicleDto;

    const vehicleExists = await this.findOneBy({ license_plate });
    if (vehicleExists) {
      throw new UnprocessableEntityException('Vehicle already registered');
    }

    await this.save({
      id: uuidv4(),
      vehicle_type_id,
      type,
      brand,
      model,
      color,
      license_plate,
      passenger_capacity,
      is_active,
    });
  }

  async findAll() {
    return this.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Vehicle> {
    return this.findOne({
      where: { id },
    });
  }

  async updateVehicle(id: string, updateVehicleDto: UpdateVehicleInput) {
    const vehicle = await this.findById(id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const {
      vehicle_type_id,
      type,
      brand,
      model,
      color,
      license_plate,
      passenger_capacity,
      is_active,
    } = updateVehicleDto;

    const newPayload = {
      vehicle_type_id,
      id,
      type,
      brand,
      model,
      color,
      license_plate,
      passenger_capacity,
      is_active,
    };

    await this.save(newPayload);
  }

  async deleteVehicle(id: string): Promise<void> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Vehicle not found');
    }
    this.softDelete(id);
  }
}
