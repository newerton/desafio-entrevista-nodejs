import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Vacancy } from '@app/vacancy/entities/vacancy.entity';

import { ReportFilterQuery } from './report.service';

@Injectable()
export class ReportRepository extends Repository<Vacancy> {
  constructor(private dataSource: DataSource) {
    super(
      Vacancy,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }

  async summaryOfInputAndOutput(query: ReportFilterQuery) {
    const querySQL = this.prepareQuery(query);
    const result = await this.query(querySQL);

    return result;
  }

  async summaryByHours(query: ReportFilterQuery) {
    const querySQL = this.prepareQuery(query);
    const result = await this.query(querySQL);

    return result;
  }

  prepareQuery(query: ReportFilterQuery) {
    const where = [];
    const filter = query?.filter;

    let select = `SELECT company.id, company.fantasy_name`;
    const from = `FROM vacancy LEFT JOIN company ON vacancy.company_id = company.id`;
    let groupBy = 'GROUP BY company.id, company.fantasy_name';

    if (filter) {
      if (filter.company_id) {
        where.push(`vacancy.company_id = '${filter.company_id}'`);
      }

      if (filter.vehicle_type_id) {
        where.push(`vacancy.vehicle_type_id = '${filter.vehicle_type_id}'`);
      }

      if (filter.for_hours) {
        select += `,CONCAT(DATE(vacancy.date_in), ' ', HOUR(vacancy.date_in), ':00') as date`;
        groupBy += `, HOUR(vacancy.date_in), DAY(vacancy.date_in), MONTH(vacancy.date_in), YEAR(vacancy.date_in), vacancy.date_in`;
      }
    }

    select += `, (SELECT COUNT(*) FROM vacancy WHERE id = vacancy.id AND date_in IS NOT NULL) AS total_input, (SELECT COUNT(*) FROM vacancy WHERE id = vacancy.id AND date_out IS NOT NULL) AS total_out`;

    const querySQL = `${select} ${from} ${
      where.length > 0 ? `WHERE ${where.join(' AND ')}` : ''
    } ${groupBy}`;

    console.log({ querySQL });
    return querySQL;
  }
}
