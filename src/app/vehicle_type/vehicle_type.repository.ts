import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateVehicleTypeInput } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeInput } from './dto/update-vehicle_type.dto';
import { VehicleType } from './entities/vehicle_type.entity';
@Injectable()
export class VehicleTypeRepository extends Repository<VehicleType> {
  constructor(private dataSource: DataSource) {
    super(
      VehicleType,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createVehicleType(
    createVehicleTypeDto: CreateVehicleTypeInput,
  ): Promise<void> {
    const { name, is_active } = createVehicleTypeDto;

    const exists = await this.findOneBy({ name });
    if (exists) {
      throw new UnprocessableEntityException('Vehicle Type already registered');
    }

    await this.save({ id: uuidv4(), name, is_active });
  }

  async findAll() {
    return this.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<VehicleType> {
    return this.findOne({
      where: { id },
    });
  }

  async updateVehicleType(
    id: string,
    updateVehicleTypeDto: UpdateVehicleTypeInput,
  ) {
    const vehicle_type = await this.findById(id);
    if (!vehicle_type) {
      throw new NotFoundException('Vehicle Type not found');
    }

    const { name, is_active } = updateVehicleTypeDto;

    const newPayload = { id, name, is_active };

    await this.save(newPayload);
  }

  async deleteVehicleType(id: string): Promise<void> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Vehicle Type not found');
    }
    this.softDelete(id);
  }
}
