import { PartialType } from '@nestjs/mapped-types';

import { CreateCompanyInput, CreateCompanyOutput } from './create-company.dto';

export class UpdateCompanyInput extends PartialType(CreateCompanyInput) {}

export class UpdateCompanyOutput extends PartialType(CreateCompanyOutput) {}
