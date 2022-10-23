import { PartialType } from '@nestjs/mapped-types';

import { CreateVehicleInput } from './create-vehicle.dto';

export class UpdateVehicleInput extends PartialType(CreateVehicleInput) {}
