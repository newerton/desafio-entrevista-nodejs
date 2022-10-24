import { faker as Faker } from '@faker-js/faker';

import { VehicleType } from '@app/vehicle_type/entities/vehicle_type.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class VehicleTypeFakerBuilder<TBuild = any> {
  private _name: PropOrFactory<string> = () => 'Car';
  private _is_active: PropOrFactory<boolean> = () => true;

  private countObjs;
  private faker: typeof Faker;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.faker = Faker;
  }

  static aVehicleType() {
    return new VehicleTypeFakerBuilder<VehicleType>();
  }

  static theVehicleTypes(countObjs: number) {
    return new VehicleTypeFakerBuilder<VehicleType[]>(countObjs);
  }

  // name
  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: '' | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withInvalidNameTooLong(value?: string) {
    this._name = value ?? this.faker.datatype.string(256);
    return this;
  }

  activate() {
    this._is_active = true;
    return this;
  }

  deactivate() {
    this._is_active = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: '' | null | undefined) {
    this._is_active = value as any;
    return this;
  }

  withInvalidIsActiveNotABoolean(value?: any) {
    this._is_active = value ?? 'fake boolean';
    return this;
  }

  build(): TBuild {
    const array = new Array(this.countObjs).fill(undefined).map((_, index) => ({
      name: this.callFactory(this._name, index),
      is_active: this.callFactory(this._is_active, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get name() {
    return this.getValue('name');
  }
  get is_active() {
    return this.getValue('is_active');
  }

  private getValue(prop) {
    const optional = ['id', 'created_at'];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
