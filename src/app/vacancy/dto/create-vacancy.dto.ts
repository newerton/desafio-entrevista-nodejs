import { ApiProperty } from '@nestjs/swagger';

export class CreateVacancyInput {
  company_id: string;

  @ApiProperty({ type: 'uuid', example: '' })
  readonly vehicle_id: string;

  @ApiProperty({ type: 'datetime', example: '2022-10-22 10:30' })
  readonly date_in?: Date;

  @ApiProperty({ type: 'datetime', example: '2022-10-22 11:30' })
  readonly date_out?: Date;
}
