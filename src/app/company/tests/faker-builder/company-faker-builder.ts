import { faker as Faker } from '@faker-js/faker';
import { cnpj } from 'cpf-cnpj-validator';

import { Company } from '@app/company/entities/company.entity';
import { CompanyAddress } from '@app/company/entities/company_address.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class CompanyFakerBuilder<TBuild = any> {
  private _social_name: PropOrFactory<string> = () => this.faker.company.name();
  private _fantasy_name: PropOrFactory<string> = () =>
    this.faker.company.name();
  private _email: PropOrFactory<string> = () =>
    this.faker.internet.email().toLowerCase();
  private _password: PropOrFactory<string> = () =>
    this.faker.internet.password();
  private _document: PropOrFactory<string> = () => cnpj.generate();
  private _phone: PropOrFactory<string> = () => '(11) 9 9876-5432';
  private _address = null;
  private _is_active: PropOrFactory<boolean> = () => true;

  private countObjs;
  private faker: typeof Faker;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
    this.faker = Faker;
  }

  static aCompany() {
    return new CompanyFakerBuilder<Company>();
  }

  static theCompanies(countObjs: number) {
    return new CompanyFakerBuilder<Company[]>(countObjs);
  }

  // social_name
  withSocialName(valueOrFactory: PropOrFactory<string>) {
    this._social_name = valueOrFactory;
    return this;
  }

  withInvalidSocialNameEmpty(value: '' | null | undefined) {
    this._social_name = value;
    return this;
  }

  withInvalidSocialNameNotAString(value?: any) {
    this._social_name = value ?? 5;
    return this;
  }

  withInvalidSocialNameTooLong(value?: string) {
    this._social_name = value ?? this.faker.datatype.string(256);
    return this;
  }

  // fantasy_name
  withFantasyName(valueOrFactory: PropOrFactory<string>) {
    this._fantasy_name = valueOrFactory;
    return this;
  }

  withInvalidFantasyNameEmpty(value: '' | null | undefined) {
    this._fantasy_name = value;
    return this;
  }

  withInvalidFantasyNameNotAString(value?: any) {
    this._fantasy_name = value ?? 5;
    return this;
  }

  withInvalidFantasyNameTooLong(value?: string) {
    this._fantasy_name = value ?? this.faker.datatype.string(256);
    return this;
  }

  // email
  withEmail(valueOrFactory: PropOrFactory<string>) {
    this._email = valueOrFactory;
    return this;
  }

  withInvalidEmailEmpty(value: '' | null | undefined) {
    this._email = value;
    return this;
  }

  withInvalidEmailNotAString(value?: any) {
    this._email = value ?? 5;
    return this;
  }

  withInvalidEmailTooLong(value?: string) {
    this._email = value ?? this.faker.datatype.string(256);
    return this;
  }

  // password
  withPassword(valueOrFactory: PropOrFactory<string>) {
    this._password = valueOrFactory;
    return this;
  }

  withInvalidPasswordEmpty(value: '' | null | undefined) {
    this._password = value;
    return this;
  }

  withInvalidPasswordNotAString(value?: any) {
    this._password = value ?? 5;
    return this;
  }

  withInvalidPasswordTooLong(value?: string) {
    this._password = value ?? this.faker.datatype.string(256);
    return this;
  }

  // document
  withDocument(valueOrFactory: PropOrFactory<string>) {
    this._document = valueOrFactory;
    return this;
  }

  withInvalidDocumentEmpty(value: '' | null | undefined) {
    this._document = value;
    return this;
  }

  withInvalidDocumentNotAString(value?: any) {
    this._document = value ?? 5;
    return this;
  }

  withInvalidDocumentTooLong(value?: string) {
    this._document = value ?? this.faker.datatype.string(256);
    return this;
  }

  // phone
  withPhone(valueOrFactory: PropOrFactory<string>) {
    this._phone = valueOrFactory;
    return this;
  }

  withInvalidPhoneEmpty(value: '' | null | undefined) {
    this._phone = value;
    return this;
  }

  withInvalidPhoneNotAString(value?: any) {
    this._phone = value ?? 5;
    return this;
  }

  withInvalidPhoneTooLong(value?: string) {
    this._phone = value ?? this.faker.datatype.string(256);
    return this;
  }

  // address
  withAddress(valueOrFactory: PropOrFactory<CompanyAddress>) {
    this._address = valueOrFactory;
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
      social_name: this.callFactory(this._social_name, index),
      fantasy_name: this.callFactory(this._fantasy_name, index),
      email: this.callFactory(this._email, index),
      password: this.callFactory(this._password, index),
      document: this.callFactory(this._document, index),
      phone: this.callFactory(this._phone, index),
      is_active: this.callFactory(this._is_active, index),
      address: this.callFactory(this._address, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get social_name() {
    return this.getValue('social_name');
  }
  get fantasy_name() {
    return this.getValue('fantasy_name');
  }
  get email() {
    return this.getValue('email');
  }
  get password() {
    return this.getValue('password');
  }
  get document() {
    return this.getValue('document');
  }
  get phone() {
    return this.getValue('phone');
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
