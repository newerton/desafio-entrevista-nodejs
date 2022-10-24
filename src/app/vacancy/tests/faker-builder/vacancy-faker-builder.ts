import { faker as Faker } from '@faker-js/faker';

import { Vacancy } from '@app/vacancy/entities/vacancy.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class VacancyFakerBuilder<TBuild = any> {
  private _company_id: PropOrFactory<string> = () => undefined;
  private _vehicle_id: PropOrFactory<string> = () => undefined;
  private _date_in: PropOrFactory<string> = () => new Date().toISOString();
  private _date_out: PropOrFactory<string> = () => new Date().toISOString();

  private countObjs;
  private faker: typeof Faker;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.faker = Faker;
  }

  static aVacancy() {
    return new VacancyFakerBuilder<Vacancy>();
  }

  static theVacancies(countObjs: number) {
    return new VacancyFakerBuilder<Vacancy[]>(countObjs);
  }

  // company_id
  withCompanyId(valueOrFactory: PropOrFactory<string>) {
    this._company_id = valueOrFactory;
    return this;
  }

  withInvalidCompanyIdEmpty(value: '' | null | undefined) {
    this._company_id = value;
    return this;
  }

  withInvalidCompanyIdNotAString(value?: any) {
    this._company_id = value ?? 5;
    return this;
  }

  withInvalidCompanyIdTooLong(value?: string) {
    this._company_id = value ?? this.faker.datatype.string(256);
    return this;
  }

  // vehicle_id
  withVehicleId(valueOrFactory: PropOrFactory<string>) {
    this._vehicle_id = valueOrFactory;
    return this;
  }

  withInvalidVehicleIdEmpty(value: '' | null | undefined) {
    this._vehicle_id = value;
    return this;
  }

  withInvalidVehicleIdNotAString(value?: any) {
    this._vehicle_id = value ?? 5;
    return this;
  }

  withInvalidVehicleIdTooLong(value?: string) {
    this._vehicle_id = value ?? this.faker.datatype.string(256);
    return this;
  }

  // date_in
  withDateIn(valueOrFactory: PropOrFactory<string>) {
    this._date_in = valueOrFactory;
    return this;
  }

  withInvalidDateInEmpty(value: '' | null | undefined) {
    this._date_in = value;
    return this;
  }

  withInvalidDateInNotAString(value?: any) {
    this._date_in = value ?? 5;
    return this;
  }

  withInvalidDateInTooLong(value?: string) {
    this._date_in = value ?? this.faker.datatype.string(256);
    return this;
  }

  // date_out
  withDateOut(valueOrFactory: PropOrFactory<string>) {
    this._date_out = valueOrFactory;
    return this;
  }

  withInvalidDateOutEmpty(value: '' | null | undefined) {
    this._date_out = value;
    return this;
  }

  withInvalidDateOutNotAString(value?: any) {
    this._date_out = value ?? 5;
    return this;
  }

  withInvalidDateOutTooLong(value?: string) {
    this._date_out = value ?? this.faker.datatype.string(256);
    return this;
  }

  build(): TBuild {
    const array = new Array(this.countObjs).fill(undefined).map((_, index) => ({
      company_id: this.callFactory(this._company_id, index),
      vehicle_id: this.callFactory(this._vehicle_id, index),
      date_in: this.callFactory(this._date_in, index),
      date_out: this.callFactory(this._date_out, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get company_id() {
    return this.getValue('company_id');
  }

  get vehicle_id() {
    return this.getValue('vehicle_id');
  }

  get date_in() {
    return this.getValue('date_in');
  }

  get date_out() {
    return this.getValue('date_out');
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
