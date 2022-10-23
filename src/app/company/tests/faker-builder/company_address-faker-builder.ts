import { faker as Faker } from '@faker-js/faker';

import { CompanyAddress } from '@app/company/entities/company_address.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class CompanyAddressFakerBuilder<TBuild = any> {
  private _zipcode: PropOrFactory<string> = () => this.faker.address.zipCode();
  private _street: PropOrFactory<string> = () => this.faker.address.street();
  private _number: PropOrFactory<string> = () =>
    this.faker.address.buildingNumber();
  private _neighborhood: PropOrFactory<string> = () => 'Centro';
  private _complement: PropOrFactory<string> = () => 'Ap 10';
  private _state_id: PropOrFactory<number | string> = () => 1;
  private _city_id: PropOrFactory<number | string> = () => 1;

  private countObjs;
  private faker: typeof Faker;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.faker = Faker;
  }

  static aCompanyAddress() {
    return new CompanyAddressFakerBuilder<CompanyAddress>();
  }

  static theCompanyAddresses(countObjs: number) {
    return new CompanyAddressFakerBuilder<CompanyAddress[]>(countObjs);
  }

  // zipcode
  withZipcode(valueOrFactory: PropOrFactory<string>) {
    this._zipcode = valueOrFactory;
    return this;
  }

  withInvalidZipcodeEmpty(value: '' | null | undefined) {
    this._zipcode = value;
    return this;
  }

  withInvalidZipcodeNotAString(value?: any) {
    this._zipcode = value ?? 5;
    return this;
  }

  withInvalidZipcodeTooLong(value?: string) {
    this._zipcode = value ?? this.faker.datatype.string(256);
    return this;
  }

  // street
  withStreet(valueOrFactory: PropOrFactory<string>) {
    this._street = valueOrFactory;
    return this;
  }

  withInvalidStreetEmpty(value: '' | null | undefined) {
    this._street = value;
    return this;
  }

  withInvalidStreetNotAString(value?: any) {
    this._street = value ?? 5;
    return this;
  }

  withInvalidStreetTooLong(value?: string) {
    this._street = value ?? this.faker.datatype.string(256);
    return this;
  }

  // number
  withNumber(valueOrFactory: PropOrFactory<string>) {
    this._number = valueOrFactory;
    return this;
  }

  withInvalidNumberEmpty(value: '' | null | undefined) {
    this._number = value;
    return this;
  }

  withInvalidNumberNotAString(value?: any) {
    this._number = value ?? 5;
    return this;
  }

  withInvalidNumberTooLong(value?: string) {
    this._number = value ?? this.faker.datatype.string(256);
    return this;
  }

  // neighborhood
  withNeighborhood(valueOrFactory: PropOrFactory<string>) {
    this._neighborhood = valueOrFactory;
    return this;
  }

  withInvalidNeighborhoodEmpty(value: '' | null | undefined) {
    this._neighborhood = value;
    return this;
  }

  withInvalidNeighborhoodNotAString(value?: any) {
    this._neighborhood = value ?? 5;
    return this;
  }

  withInvalidNeighborhoodTooLong(value?: string) {
    this._neighborhood = value ?? this.faker.datatype.string(256);
    return this;
  }

  // complement
  withComplement(valueOrFactory: PropOrFactory<string>) {
    this._complement = valueOrFactory;
    return this;
  }

  withInvalidComplementEmpty(value: '' | null | undefined) {
    this._complement = value;
    return this;
  }

  withInvalidComplementNotAString(value?: any) {
    this._complement = value ?? 5;
    return this;
  }

  withInvalidComplementTooLong(value?: string) {
    this._complement = value ?? this.faker.datatype.string(256);
    return this;
  }

  // state_id
  withStateId(valueOrFactory: PropOrFactory<number>) {
    this._state_id = valueOrFactory;
    return this;
  }

  withInvalidStateIdEmpty(value: '' | null | undefined) {
    this._state_id = value;
    return this;
  }

  withInvalidStateIdNotANumber(value?: any) {
    this._state_id = value ?? '5';
    return this;
  }

  // city_id
  withCityId(valueOrFactory: PropOrFactory<number>) {
    this._city_id = valueOrFactory;
    return this;
  }

  withInvalidCityIdEmpty(value: '' | null | undefined) {
    this._city_id = value;
    return this;
  }

  withInvalidCityIdNotANumber(value?: any) {
    this._city_id = value ?? '5';
    return this;
  }

  build(): TBuild {
    const array = new Array(this.countObjs).fill(undefined).map((_, index) => ({
      zipcode: this.callFactory(this._zipcode, index),
      street: this.callFactory(this._street, index),
      number: this.callFactory(this._number, index),
      neighborhood: this.callFactory(this._neighborhood, index),
      complement: this.callFactory(this._complement, index),
      state_id: this.callFactory(this._state_id, index),
      city_id: this.callFactory(this._city_id, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get zipcode() {
    return this.getValue('zipcode');
  }

  get street() {
    return this.getValue('street');
  }

  get number() {
    return this.getValue('number');
  }

  get neighborhood() {
    return this.getValue('neighborhood');
  }

  get complement() {
    return this.getValue('complement');
  }

  get state_id() {
    return this.getValue('state_id');
  }

  get city_id() {
    return this.getValue('city_id');
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
