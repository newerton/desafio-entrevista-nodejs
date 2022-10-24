import { Injectable } from '@nestjs/common';

import { CreateVacancyInput } from './dto/create-vacancy.dto';
import { UpdateVacancyInput } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { VacancyRepository } from './vacancy.repository';

@Injectable()
export class VacancyService {
  constructor(private readonly repository: VacancyRepository) {}

  async create(createVacancyDto: CreateVacancyInput): Promise<void> {
    return this.repository.createVacancy(createVacancyDto);
  }

  async findAll(): Promise<Vacancy[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<Vacancy> {
    return this.repository.findById(id);
  }

  async update(
    id: string,
    updateVacancyDto: UpdateVacancyInput,
  ): Promise<void> {
    return this.repository.updateVacancy(id, updateVacancyDto);
  }

  async remove(id: string): Promise<void> {
    return this.repository.deleteVacancy(id);
  }
}
