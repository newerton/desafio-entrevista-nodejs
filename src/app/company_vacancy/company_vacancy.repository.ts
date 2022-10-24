import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CreateCompanyVacancyInput } from './dto/create-company_vacancy.dto';
import { UpdateCompanyVacancyInput } from './dto/update-company_vacancy.dto';
import { CompanyVacancy } from './entities/company_vacancy.entity';

@Injectable()
export class CompanyVacancyRepository extends Repository<CompanyVacancy> {
  constructor(private dataSource: DataSource) {
    super(
      CompanyVacancy,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async createCompanyVacancy(
    createCompanyVacancyDto: CreateCompanyVacancyInput,
  ): Promise<void> {
    const { company_id, vehicle_type_id, quantity, is_active } =
      createCompanyVacancyDto;

    const companyExists = await this.findOneBy({ company_id, vehicle_type_id });
    if (companyExists) {
      throw new UnprocessableEntityException('Vacancy already registered');
    }

    await this.save({
      id: uuidv4(),
      company_id,
      vehicle_type_id,
      quantity,
      is_active,
    });
  }

  async findAll() {
    return this.find({
      relations: ['company', 'vehicleType'],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findById(id: string): Promise<CompanyVacancy> {
    return this.findOne({
      where: { id },
      relations: ['company', 'vehicleType'],
    });
  }

  async updateCompanyVacancy(
    id: string,
    updateCompanyVacancyDto: UpdateCompanyVacancyInput,
  ) {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Vacancy not found');
    }

    const { company_id, vehicle_type_id, quantity, is_active } =
      updateCompanyVacancyDto;

    const newPayload = {
      id,
      company_id,
      vehicle_type_id,
      quantity,
      is_active,
    };

    await this.save(newPayload);
  }

  async deleteCompanyVacancy(id: string): Promise<void> {
    const model = await this.findById(id);
    if (!model) {
      throw new NotFoundException('Vacancy not found');
    }
    this.softDelete(id);
  }
}
