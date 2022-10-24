import { CompanyVacancy } from '@app/company_vacancy/entities/company_vacancy.entity';

type PropOrFactory<T> = T | ((index: number) => T);

export class CompanyVacancyFakerBuilder<TBuild = any> {
  private _company_id = undefined;
  private _vehicle_type_id = undefined;
  private _quantity: PropOrFactory<number | string> = () => 2;
  private _is_active: PropOrFactory<boolean> = () => true;

  private countObjs;

  private constructor(countObjs = 1) {
    this.countObjs = countObjs;
  }

  static aCompanyVacancy() {
    return new CompanyVacancyFakerBuilder<CompanyVacancy>();
  }

  static theCompanyVacancies(countObjs: number) {
    return new CompanyVacancyFakerBuilder<CompanyVacancy[]>(countObjs);
  }

  // company_id
  withCompanyId(valueOrFactory: PropOrFactory<string>) {
    this._company_id = valueOrFactory;
    return this;
  }

  // vehicle_type_id
  withVehicleTypeId(valueOrFactory: PropOrFactory<string>) {
    this._vehicle_type_id = valueOrFactory;
    return this;
  }

  // quantity
  withQuantity(valueOrFactory: PropOrFactory<number>) {
    this._quantity = valueOrFactory;
    return this;
  }

  withInvalidQuantityEmpty(value: '' | null | undefined) {
    this._quantity = value;
    return this;
  }

  withInvalidQuantityNotANumber(value?: any) {
    this._quantity = value ?? 5;
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
      company_id: this.callFactory(this._company_id, index),
      vehicle_type_id: this.callFactory(this._vehicle_type_id, index),
      quantity: this.callFactory(this._quantity, index),
      is_active: this.callFactory(this._is_active, index),
    }));
    return this.countObjs === 1 ? (array[0] as any) : array;
  }

  get quantity() {
    return this.getValue('quantity');
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
