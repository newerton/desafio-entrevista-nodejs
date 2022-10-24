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
import { ErrorSchema } from '@common/schemas/Error.schema';

import { CompanyVacancyService } from './company_vacancy.service';
import { CreateCompanyVacancyInput } from './dto/create-company_vacancy.dto';
import { UpdateCompanyVacancyInput } from './dto/update-company_vacancy.dto';
import { CompanyVacancy } from './entities/company_vacancy.entity';

@ApiTags('company-vacancies')
@Controller('company-vacancies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class CompanyVacancyController {
  constructor(private readonly service: CompanyVacancyService) {}

  @Post()
  @ApiOperation({ summary: 'Create company vacancy' })
  @ApiCreatedResponse({ description: 'Not content' })
  create(@Body() createCompanyDto: CreateCompanyVacancyInput): Promise<void> {
    return this.service.create(createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all company vacancies' })
  @ApiOkResponse({
    description: 'List all company vacancies',
    type: CompanyVacancy,
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company vacancy by id' })
  @ApiOkResponse({
    description: 'Company vacancy object',
    type: CompanyVacancy,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update company vacancy info' })
  @ApiNoContentResponse({ description: 'No content' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyVacancyInput,
  ): Promise<void> {
    return this.service.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete company vacancy info' })
  @ApiNoContentResponse({ description: 'No content' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
