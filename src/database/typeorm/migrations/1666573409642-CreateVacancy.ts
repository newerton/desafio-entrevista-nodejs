import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateVacancy1666573409642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vacancy',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'company_id',
            type: 'varchar',
            generationStrategy: 'uuid',
          },
          {
            name: 'vehicle_id',
            type: 'varchar',
            generationStrategy: 'uuid',
          },
          {
            name: 'date_in',
            type: 'datetime',
            isNullable: true,
            default: null,
          },
          {
            name: 'date_out',
            type: 'datetime',
            isNullable: true,
            default: null,
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
      'vacancy',
      new TableForeignKey({
        name: 'fk-vacancy-company_id',
        columnNames: ['company_id'],
        referencedTableName: 'company',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'vacancy',
      new TableForeignKey({
        name: 'fk-vacancy-vehicle_id',
        columnNames: ['vehicle_id'],
        referencedTableName: 'vehicle',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'vacancy',
      new TableIndex({
        name: 'fk-vacancy-company_id',
        columnNames: ['company_id'],
        parser: 'btree',
      }),
    );

    await queryRunner.createIndex(
      'vacancy',
      new TableIndex({
        name: 'fk-vacancy-vehicle_id',
        columnNames: ['vehicle_id'],
        parser: 'btree',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vacancy');
  }
}
