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

import { CreateVehicleTypeInput } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeInput } from './dto/update-vehicle_type.dto';
import { VehicleType } from './entities/vehicle_type.entity';
import { VehicleTypeService } from './vehicle_type.service';

@ApiTags('vehicle-types')
@Controller('vehicle-types')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorSchema })
@ApiBadRequestResponse({ description: 'Bad Request', type: ErrorSchema })
@ApiUnprocessableEntityResponse({
  description: 'Unprocessable Entity',
  type: ErrorSchema,
})
export class VehicleTypeController {
  constructor(private readonly service: VehicleTypeService) {}

  @Post()
  @ApiOperation({ summary: 'Create vehicle type' })
  @ApiCreatedResponse({ description: 'Not content' })
  create(@Body() createVehicleTypeDto: CreateVehicleTypeInput): Promise<void> {
    return this.service.create(createVehicleTypeDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all vehicle types' })
  @ApiOkResponse({ description: 'List all vehicle types', type: VehicleType })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle type by id' })
  @ApiOkResponse({ description: 'Vehicle type object', type: VehicleType })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update vehicle type info' })
  @ApiNoContentResponse({ description: 'No content' })
  update(
    @Param('id') id: string,
    @Body() updateVehicleTypeDto: UpdateVehicleTypeInput,
  ): Promise<void> {
    return this.service.update(id, updateVehicleTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Update vehicle type info' })
  @ApiNoContentResponse({ description: 'No content' })
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
