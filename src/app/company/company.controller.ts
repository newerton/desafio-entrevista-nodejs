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
import { Public } from '@common/decorators/public.decorator';
import { ErrorSchema } from '@common/schemas/Error.schema';

import { CompanyService } from './company.service';
import { CreateCompanyInput } from './dto/create-company.dto';
import { UpdateCompanyInput } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('companies')
@Controller('companies')
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class CompanyController {
  constructor(private readonly service: CompanyService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create company' })
  @ApiCreatedResponse({ description: 'Not content' })
  create(@Body() createCompanyDto: CreateCompanyInput): Promise<void> {
    return this.service.create(createCompanyDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List all companies' })
  @ApiOkResponse({ description: 'List all companies', type: Company })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a company by id' })
  @ApiOkResponse({ description: 'Company object', type: Company })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update company info' })
  @ApiNoContentResponse({ description: 'No content' })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyInput,
  ): Promise<void> {
    return this.service.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a company by id' })
  @ApiNoContentResponse({ description: 'No content' })
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
