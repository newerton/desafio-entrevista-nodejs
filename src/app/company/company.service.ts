import { Injectable } from '@nestjs/common';
import { UpdateResult } from 'typeorm';

import { CompanyRepository } from './company.repository';
import { CreateCompanyInput } from './dto/create-company.dto';
import { UpdateCompanyInput } from './dto/update-company.dto';
import { Company } from './entities/company.entity';
@Injectable()
export class CompanyService {
  constructor(private readonly repository: CompanyRepository) {}

  async create(createCompanyDto: CreateCompanyInput): Promise<void> {
    return this.repository.createCompany(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Company> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyInput,
  ): Promise<void> {
    return this.repository.updateCompany(id, updateCompanyDto);
  }

  async remove(id: string): Promise<void> {
    return this.repository.deleteCompany(id);
  }
}
