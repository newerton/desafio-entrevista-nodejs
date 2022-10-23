import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class RemoveVehicleTypeIdInVehicleTable1666556178583
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vehicle', 'fk-vehicle-vehicle_type_id');
    await queryRunner.dropIndex('vehicle', 'fk-vehicle-vehicle_type_id');
    await queryRunner.dropColumn('vehicle', 'vehicle_type_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'vehicle',
      new TableColumn({
        name: 'vehicle_type_id',
        type: 'varchar',
        generationStrategy: 'uuid',
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
}
