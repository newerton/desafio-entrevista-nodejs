import { PartialType } from '@nestjs/mapped-types';

import { CreateCompanyVacancyInput } from './create-company_vacancy.dto';

export class UpdateCompanyVacancyInput extends PartialType(
  CreateCompanyVacancyInput,
) {}
