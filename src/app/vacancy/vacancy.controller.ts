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

import { CreateVacancyInput } from './dto/create-vacancy.dto';
import { UpdateVacancyInput } from './dto/update-vacancy.dto';
import { VacancyService } from './vacancy.service';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly service: VacancyService) {}

  @Post()
  create(@Body() createVacancyDto: CreateVacancyInput): Promise<void> {
    return this.service.create(createVacancyDto);
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
    @Body() updateVacancyDto: UpdateVacancyInput,
  ): Promise<void> {
    return this.service.update(id, updateVacancyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
