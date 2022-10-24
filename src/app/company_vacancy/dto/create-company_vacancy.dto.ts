import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyVacancyInput {
  @ApiProperty({ type: 'uuid', example: '' })
  readonly company_id: string;

  @ApiProperty({ type: 'uuid', example: '' })
  readonly vehicle_type_id: string;

  @ApiProperty({ type: 'number', example: 2 })
  readonly quantity: string;

  @ApiProperty({ example: true })
  readonly is_active?: boolean;
}
