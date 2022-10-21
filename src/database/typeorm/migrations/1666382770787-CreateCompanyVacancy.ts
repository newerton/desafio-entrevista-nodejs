import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateCompanyVacancy1666382770787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'company_vacancy',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'company_id',
            type: 'uuid',
          },
          {
            name: 'vehicle_id',
            type: 'uuid',
          },
          {
            name: 'quantity',
            type: 'int',
            default: 0,
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            default: null,
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'company_vacancy',
      new TableForeignKey({
        name: 'fk-company_vacancy-company_id',
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'company_vacancy',
      new TableForeignKey({
        name: 'fk-company_vacancy-vehicle_id',
        columnNames: ['vehicle_id'],
        referencedTableName: 'vehicle_type',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'company_vacancy',
      new TableIndex({
        name: 'fk-company_vacancy-company_id',
        columnNames: ['company_id'],
        parser: 'btree',
      }),
    );

    await queryRunner.createIndex(
      'company_vacancy',
      new TableIndex({
        name: 'fk-company_vacancy-vehicle_id',
        columnNames: ['vehicle_id'],
        parser: 'btree',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('company_vacancy');
  }
}
