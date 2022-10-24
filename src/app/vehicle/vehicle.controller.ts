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

import { CreateVehicleInput } from './dto/create-vehicle.dto';
import { UpdateVehicleInput } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleService } from './vehicle.service';

@ApiTags('vehicles')
@Controller('vehicles')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class VehicleController {
  constructor(private readonly service: VehicleService) {}

  @Post()
  @ApiOperation({ summary: 'Create vehicle' })
  @ApiCreatedResponse({ description: 'Not content' })
  create(@Body() createVehicleDto: CreateVehicleInput): Promise<void> {
    return this.service.create(createVehicleDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all vehicles' })
  @ApiOkResponse({ description: 'List all vehicles', type: Vehicle })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by id' })
  @ApiOkResponse({ description: 'Vehicle object', type: Vehicle })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update vehicle info' })
  @ApiNoContentResponse({ description: 'No content' })
  update(
    @Param('id') id: string,
    @Body() updateVehicleDto: UpdateVehicleInput,
  ): Promise<void> {
    return this.service.update(id, updateVehicleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update vehicle info' })
  @ApiNoContentResponse({ description: 'No content' })
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
