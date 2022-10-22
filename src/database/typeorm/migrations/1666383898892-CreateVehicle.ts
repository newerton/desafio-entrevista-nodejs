import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateVehicle1666383898892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'vehicle_type_id',
            type: 'varchar',
            generationStrategy: 'uuid',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'model',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'license_plate',
            type: 'varchar',
          },
          {
            name: 'passenger_capacity',
            type: 'int',
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
      'vehicle',
      new TableForeignKey({
        name: 'fk-vehicle-vehicle_type_id',
        columnNames: ['vehicle_type_id'],
        referencedTableName: 'vehicle_type',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createIndex(
      'vehicle',
      new TableIndex({
        name: 'fk-vehicle-vehicle_type_id',
        columnNames: ['vehicle_type_id'],
        parser: 'btree',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vehicle');
  }
}
