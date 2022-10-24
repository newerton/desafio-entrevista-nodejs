import { Injectable } from '@nestjs/common';

import { CompanyVacancyRepository } from './company_vacancy.repository';
import { CreateCompanyVacancyInput } from './dto/create-company_vacancy.dto';
import { UpdateCompanyVacancyInput } from './dto/update-company_vacancy.dto';
import { CompanyVacancy } from './entities/company_vacancy.entity';

@Injectable()
export class CompanyVacancyService {
  constructor(private readonly repository: CompanyVacancyRepository) {}

  async create(
    createCompanyVacancyDto: CreateCompanyVacancyInput,
  ): Promise<void> {
    return this.repository.createCompanyVacancy(createCompanyVacancyDto);
  }

  async findAll(): Promise<CompanyVacancy[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<CompanyVacancy> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    updateCompanyVacancyDto: UpdateCompanyVacancyInput,
  ): Promise<void> {
    return this.repository.updateCompanyVacancy(id, updateCompanyVacancyDto);
  }

  async remove(id: string): Promise<void> {
    return this.repository.deleteCompanyVacancy(id);
  }
}
