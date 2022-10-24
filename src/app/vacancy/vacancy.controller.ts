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
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@common/auth/jwt/jwt-auth.guard';
import { JwtData } from '@common/auth/jwt/jwt.strategy';
import { ErrorSchema } from '@common/schemas/Error.schema';
import { Request } from 'express';

import { CreateVacancyInput } from './dto/create-vacancy.dto';
import { UpdateVacancyInput } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';
import { VacancyService } from './vacancy.service';

@ApiTags('vacancies')
@Controller('vacancies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class VacancyController {
  constructor(private readonly service: VacancyService) {}

  @Post()
  @ApiOperation({ summary: 'Create vacancy' })
  @ApiCreatedResponse({ description: 'Not content' })
  create(
    @Body() createVacancyDto: CreateVacancyInput,
    @Req() request: Request,
  ): Promise<void> {
    const user = request.user as JwtData;
    createVacancyDto.company_id = user.id;
    return this.service.create(createVacancyDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all vacancies' })
  @ApiOkResponse({ description: 'List all vacancies', type: Vacancy })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vacancy by id' })
  @ApiOkResponse({ description: 'Vacancy object', type: Vacancy })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update vacancy info' })
  @ApiNoContentResponse({ description: 'No content' })
  update(
    @Param('id') id: string,
    @Body() updateVacancyDto: UpdateVacancyInput,
  ): Promise<void> {
    return this.service.update(id, updateVacancyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Update vacancy info' })
  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
