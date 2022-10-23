import { PartialType } from '@nestjs/mapped-types';

import { CreateCompanyInput } from './create-company.dto';

export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}
