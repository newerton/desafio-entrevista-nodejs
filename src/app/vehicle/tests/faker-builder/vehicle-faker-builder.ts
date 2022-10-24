import { faker as Faker } from '@faker-js/faker';

import { Vehicle } from '@app/vehicle/entities/vehicle.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class VehicleFakerBuilder<TBuild = any> {
  private _vehicle_type_id = undefined;
  private _type: PropOrFactory<string> = () => 'Utilitário';
  private _brand: PropOrFactory<string> = () =>
    this.faker.vehicle.manufacturer();
  private _model: PropOrFactory<string> = () => this.faker.vehicle.model();
  private _color: PropOrFactory<string> = () => this.faker.vehicle.color();
  private _license_plate: PropOrFactory<string> = () =>
    this.faker.vehicle.vrm();
  private _passenger_capacity: PropOrFactory<number | string> = () => 5;
  private _is_active: PropOrFactory<boolean> = () => true;

  private countObjs;
  private faker: typeof Faker;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.faker = Faker;
  }

  static aVehicle() {
    return new VehicleFakerBuilder<Vehicle>();
  }

  static theVehicles(countObjs: number) {
    return new VehicleFakerBuilder<Vehicle[]>(countObjs);
  }

  // type
  withVehicleTypeId(valueOrFactory: PropOrFactory<string>) {
    this._vehicle_type_id = valueOrFactory;
    return this;
  }

  withInvalidVehicleTypeIdEmpty(value: '' | null | undefined) {
    this._vehicle_type_id = value;
    return this;
  }

  withInvalidVehicleTypeIdNotAString(value?: any) {
    this._vehicle_type_id = value ?? 5;
    return this;
  }

  withInvalidVehicleTypeIdTooLong(value?: string) {
    this._vehicle_type_id = value ?? this.faker.datatype.string(256);
    return this;
  }

  // type
  withType(valueOrFactory: PropOrFactory<string>) {
    this._type = valueOrFactory;
    return this;
  }

  withInvalidTypeEmpty(value: '' | null | undefined) {
    this._type = value;
    return this;
  }

  withInvalidTypeNotAString(value?: any) {
    this._type = value ?? 5;
    return this;
  }

  withInvalidTypeTooLong(value?: string) {
    this._type = value ?? this.faker.datatype.string(256);
    return this;
  }

  // brand
  withBrand(valueOrFactory: PropOrFactory<string>) {
    this._brand = valueOrFactory;
    return this;
  }

  withInvalidBrandEmpty(value: '' | null | undefined) {
    this._brand = value;
    return this;
  }

  withInvalidBrandNotAString(value?: any) {
    this._brand = value ?? 5;
    return this;
  }

  withInvalidBrandTooLong(value?: string) {
    this._brand = value ?? this.faker.datatype.string(256);
    return this;
  }

  // model
  withModel(valueOrFactory: PropOrFactory<string>) {
    this._model = valueOrFactory;
    return this;
  }

  withInvalidModelEmpty(value: '' | null | undefined) {
    this._model = value;
    return this;
  }

  withInvalidModelNotAString(value?: any) {
    this._model = value ?? 5;
    return this;
  }

  withInvalidModelTooLong(value?: string) {
    this._model = value ?? this.faker.datatype.string(256);
    return this;
  }

  // color
  withColor(valueOrFactory: PropOrFactory<string>) {
    this._color = valueOrFactory;
    return this;
  }

  withInvalidColorEmpty(value: '' | null | undefined) {
    this._color = value;
    return this;
  }

  withInvalidColorNotAString(value?: any) {
    this._color = value ?? 5;
    return this;
  }

  withInvalidColorTooLong(value?: string) {
    this._color = value ?? this.faker.datatype.string(256);
    return this;
  }

  // license_plate
  withLicensePlate(valueOrFactory: PropOrFactory<string>) {
    this._license_plate = valueOrFactory;
    return this;
  }

  withInvalidLicensePlateEmpty(value: '' | null | undefined) {
    this._license_plate = value;
    return this;
  }

  withInvalidLicensePlateNotAString(value?: any) {
    this._license_plate = value ?? 5;
    return this;
  }

  withInvalidLicensePlateTooLong(value?: string) {
    this._license_plate = value ?? this.faker.datatype.string(256);
    return this;
  }

  // passenger_capacity
  withPassengerCapacity(valueOrFactory: PropOrFactory<number>) {
    this._passenger_capacity = valueOrFactory;
    return this;
  }

  withInvalidPassengerCapacityEmpty(value: '' | null | undefined) {
    this._passenger_capacity = value;
    return this;
  }

  withInvalidPassengerCapacityNotANumber(value?: any) {
    this._passenger_capacity = value ?? '5';
    return this;
  }

  withInvalidPassengerCapacityTooLong(value?: number) {
    this._passenger_capacity = value ?? this.faker.datatype.string(256);
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
      vehicle_type_id: this.callFactory(this._vehicle_type_id, index),
      type: this.callFactory(this._type, index),
      brand: this.callFactory(this._brand, index),
      model: this.callFactory(this._model, index),
      color: this.callFactory(this._color, index),
      license_plate: this.callFactory(this._license_plate, index),
      passenger_capacity: this.callFactory(this._passenger_capacity, index),
      is_active: this.callFactory(this._is_active, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get vehicle_type_id() {
    return this.getValue('vehicle_type_id');
  }
  get type() {
    return this.getValue('type');
  }
  get brand() {
    return this.getValue('brand');
  }
  get model() {
    return this.getValue('model');
  }
  get color() {
    return this.getValue('color');
  }
  get license_plate() {
    return this.getValue('license_plate');
  }
  get passenger_capacity() {
    return this.getValue('passenger_capacity');
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
