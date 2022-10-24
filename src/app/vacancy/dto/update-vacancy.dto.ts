import { PartialType } from '@nestjs/mapped-types';

import { CreateVacancyInput } from './create-vacancy.dto';

export class UpdateVacancyInput extends PartialType(CreateVacancyInput) {}
