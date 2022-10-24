import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '@common/auth/jwt/jwt-auth.guard';
import { ErrorSchema } from '@common/schemas/Error.schema';

import { ReportService } from './report.service';

@ApiTags('report')
@Controller('report')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @Get('summary-input-output')
  @ApiOperation({ summary: 'List all vacancy by total ' })
  @ApiParam({
    name: 'filter[company_id]',
    description: 'Company ID',
  })
  summaryOfInputAndOutput(@Query() query) {
    return this.service.summaryOfInputAndOutput(query);
  }

  @Get('summary-by-hours')
  @ApiOperation({ summary: 'List all vacancy by hours' })
  @ApiParam({
    name: 'filter[company_id]',
    description: 'Company ID',
  })
  summaryByHours(@Query() query) {
    query.filter = {
      for_hours: true,
    };
    return this.service.summaryByHours(query);
  }
}
