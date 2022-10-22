import { Injectable } from '@nestjs/common';

import { CompanyOutput } from './dto/company.dto';
import { CreateCompanyInput } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  async create(createCompanyDto: CreateCompanyInput): Promise<void> {
    return Promise.resolve();
  }

  async findAll(): Promise<CompanyOutput[]> {
    return;
  }

  async findOne(id: number): Promise<CompanyOutput | Record<string, never>> {
    return;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<void> {
    return Promise.resolve();
  }

  async remove(id: number): Promise<void> {
    return Promise.resolve();
  }
}
