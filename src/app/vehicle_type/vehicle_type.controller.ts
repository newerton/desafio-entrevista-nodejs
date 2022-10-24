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

import { CreateVehicleTypeInput } from './dto/create-vehicle_type.dto';
import { UpdateVehicleTypeInput } from './dto/update-vehicle_type.dto';
import { VehicleTypeService } from './vehicle_type.service';

@Controller('vehicle-types')
export class VehicleTypeController {
  constructor(private readonly service: VehicleTypeService) {}

  @Post()
  create(@Body() createVehicleTypeDto: CreateVehicleTypeInput): Promise<void> {
    return this.service.create(createVehicleTypeDto);
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
    @Body() updateVehicleTypeDto: UpdateVehicleTypeInput,
  ): Promise<void> {
    return this.service.update(id, updateVehicleTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
