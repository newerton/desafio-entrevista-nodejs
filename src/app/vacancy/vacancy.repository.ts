import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CompanyVacancyRepository } from '@app/company_vacancy/company_vacancy.repository';
import { VehicleRepository } from '@app/vehicle/vehicle.repository';

import { CreateVacancyInput } from './dto/create-vacancy.dto';
import { UpdateVacancyInput } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@Injectable()
export class VacancyRepository extends Repository<Vacancy> {
  constructor(
    private dataSource: DataSource,
    private readonly companyVacancyRepository: CompanyVacancyRepository,
    private readonly vehicleRepository: VehicleRepository,
  ) {
    super(
      Vacancy,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createVacancy(createVacancyDto: CreateVacancyInput): Promise<void> {
    const { company_id, vehicle_id, date_in, date_out } = createVacancyDto;

    const exists = await this.findOneBy({ company_id, vehicle_id, date_in });
    if (exists) {
      throw new UnprocessableEntityException('Vacancy already registered');
    }

    const vehicle = await this.vehicleRepository.findOneBy({
      id: vehicle_id,
      is_active: true,
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const totalVacancyByVehicleType =
      await this.companyVacancyRepository.findOneBy({
        company_id,
        vehicle_type_id: vehicle.vehicle_type_id,
      });
    if (!totalVacancyByVehicleType) {
      throw new NotFoundException('Vacancy not registered');
    }

    const totalOccupied = await this.count({
      where: {
        company_id,
        vehicle_id,
      },
    });

    if (totalOccupied >= parseInt(totalVacancyByVehicleType.quantity, 10)) {
      throw new BadRequestException('This vacancy is full');
    }

    await this.save({
      id: uuidv4(),
      company_id,
      vehicle_id,
      date_in,
      date_out,
    });
  }

  async findAll() {
    return this.find({
      relations: ['company', 'vehicle'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<Vacancy> {
    return this.findOne({
      where: { id },
    });
  }

  async updateVacancy(id: string, updateVacancyDto: UpdateVacancyInput) {
    const vacancy = await this.findById(id);
    if (!vacancy) {
      throw new NotFoundException('Vacancy not found');
    }

    const { company_id, vehicle_id, date_in, date_out } = updateVacancyDto;
    const newPayload = { id, company_id, vehicle_id, date_in, date_out };
    await this.save(newPayload);
  }

  async deleteVacancy(id: string): Promise<void> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Vacancy not found');
    }
    this.softDelete(id);
  }
}
