import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { CompanyVacancyService } from './company_vacancy.service';
import { CreateCompanyVacancyInput } from './dto/create-company_vacancy.dto';
import { UpdateCompanyVacancyInput } from './dto/update-company_vacancy.dto';

@Controller('company-vacancies')
export class CompanyVacancyController {
  constructor(private readonly service: CompanyVacancyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyVacancyInput): Promise<void> {
    return this.service.create(createCompanyDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyVacancyInput,
  ): Promise<void> {
    return this.service.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
