import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Company } from './entities/company.entity';

@Injectable()
export class CompanyRepository extends Repository<Company> {
  constructor(private dataSource: DataSource) {
    super(
      Company,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
