import { PartialType } from '@nestjs/mapped-types';

import { CreateVehicleTypeInput } from './create-vehicle_type.dto';

export class UpdateVehicleTypeInput extends PartialType(
  CreateVehicleTypeInput,
) {}
