import { Injectable } from '@nestjs/common';

import { ReportRepository } from './report.repository';

export type ReportFilterQuery = {
  filter: {
    company_id: string;
    vehicle_type_id: string;
    for_hours: boolean;
  };
};

@Injectable()
export class ReportService {
  constructor(private readonly repository: ReportRepository) {}

  summaryOfInputAndOutput(query: ReportFilterQuery) {
    return this.repository.summaryOfInputAndOutput(query);
  }

  summaryByHours(query: ReportFilterQuery) {
    return this.repository.summaryByHours(query);
  }
}
