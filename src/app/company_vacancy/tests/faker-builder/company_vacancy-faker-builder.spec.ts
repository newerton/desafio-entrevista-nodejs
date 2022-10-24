import { CompanyVacancyFakerBuilder } from './company_vacancy-faker-builder';

describe('CompanyVacancyFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = CompanyVacancyFakerBuilder.aCompanyVacancy();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('quantity prop', () => {
    const companyVacancyFaker = CompanyVacancyFakerBuilder.aCompanyVacancy();
    it('should be a function', () => {
      expect(
        typeof companyVacancyFaker['_quantity'] === 'function',
      ).toBeTruthy();
    });

    test('withQuantity', () => {
      const $this = companyVacancyFaker.withQuantity(4);
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_quantity']).toBe(4);

      companyVacancyFaker.withQuantity(() => 4);
      //@ts-expect-error quantity is callable
      expect(companyVacancyFaker['_quantity']()).toBe(4);

      expect(companyVacancyFaker.quantity).toBe(4);
    });

    it('should pass index to quantity factory', () => {
      companyVacancyFaker.withQuantity((index) => index);
      const companyVacancy = companyVacancyFaker.build();
      expect(companyVacancy.quantity).toBe(0);

      const fakerMany = CompanyVacancyFakerBuilder.theCompanyVacancies(2);
      fakerMany.withQuantity((index) => index);
      const companyVacancies = fakerMany.build();

      expect(companyVacancies[0].quantity).toBe(0);
      expect(companyVacancies[1].quantity).toBe(1);
    });

    test('invalid empty case', () => {
      const $this = companyVacancyFaker.withInvalidQuantityEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_quantity']).toBeUndefined();

      companyVacancyFaker.withInvalidQuantityEmpty(null);
      expect(companyVacancyFaker['_quantity']).toBeNull();

      companyVacancyFaker.withInvalidQuantityEmpty('');
      expect(companyVacancyFaker['_quantity']).toBe('');
    });

    test('invalid not a number case', () => {
      const $this = companyVacancyFaker.withInvalidQuantityNotANumber();
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_quantity']).toEqual(5);

      const notANumber = 123;
      companyVacancyFaker.withInvalidQuantityNotANumber(notANumber);
      expect(companyVacancyFaker['_quantity']).toBe(notANumber);
    });
  });

  describe('is_active prop', () => {
    const companyVacancyFaker = CompanyVacancyFakerBuilder.aCompanyVacancy();
    it('should be a function', () => {
      expect(
        typeof companyVacancyFaker['_is_active'] === 'function',
      ).toBeTruthy();
    });

    test('activate', () => {
      const $this = companyVacancyFaker.activate();
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_is_active']).toBeTruthy();
      expect(companyVacancyFaker.is_active).toBeTruthy();
    });

    test('deactivate', () => {
      const $this = companyVacancyFaker.deactivate();
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_is_active']).toBeFalsy();
      expect(companyVacancyFaker.is_active).toBeFalsy();
    });

    test('invalid not a string case', () => {
      const $this = companyVacancyFaker.withInvalidIsActiveEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_is_active']).toBeUndefined();

      companyVacancyFaker.withInvalidIsActiveEmpty(null);
      expect(companyVacancyFaker['_is_active']).toBeNull();

      companyVacancyFaker.withInvalidIsActiveEmpty('');
      expect(companyVacancyFaker['_is_active']).toBe('');
    });

    test('invalid not a boolean case', () => {
      const $this =
        companyVacancyFaker.withInvalidIsActiveNotABoolean(undefined);
      expect($this).toBeInstanceOf(CompanyVacancyFakerBuilder);
      expect(companyVacancyFaker['_is_active']).toBe('fake boolean');

      companyVacancyFaker.withInvalidIsActiveNotABoolean(null);
      expect(companyVacancyFaker['_is_active']).toBe('fake boolean');

      companyVacancyFaker.withInvalidIsActiveNotABoolean('');
      expect(companyVacancyFaker['_is_active']).toBe('');

      companyVacancyFaker.withInvalidIsActiveNotABoolean(1);
      expect(companyVacancyFaker['_is_active']).toBe(1);

      companyVacancyFaker.withInvalidIsActiveNotABoolean('a');
      expect(companyVacancyFaker['_is_active']).toBe('a');
    });
  });

  it('should create a company', () => {
    const companyVacancyFaker = CompanyVacancyFakerBuilder.aCompanyVacancy()
      .withCompanyId('valid uuid')
      .withVehicleTypeId('valid uuid');
    let companyVacancy = companyVacancyFaker.build();

    expect(typeof companyVacancy.company_id === 'string').toBeTruthy();
    expect(typeof companyVacancy.vehicle_type_id === 'string').toBeTruthy();
    expect(typeof companyVacancy.quantity === 'number').toBeTruthy();

    expect(companyVacancy.is_active).toBeTruthy();

    companyVacancy = companyVacancyFaker
      .withCompanyId('company id test')
      .withVehicleTypeId('vehicle id test')
      .withQuantity(5)
      .deactivate()
      .build();

    expect(companyVacancy.company_id).toBe('company id test');
    expect(companyVacancy.vehicle_type_id).toBe('vehicle id test');
    expect(companyVacancy.quantity).toBe(5);
    expect(companyVacancy.is_active).toBeFalsy();
  });

  it('should create many company vacancies', () => {
    const companyVacancyFaker = CompanyVacancyFakerBuilder.theCompanyVacancies(
      2,
    )
      .withCompanyId('valid uuid')
      .withVehicleTypeId('valid uuid');
    let companyVacancies = companyVacancyFaker.build();

    companyVacancies.forEach((companyVacancy) => {
      expect(typeof companyVacancy.company_id === 'string').toBeTruthy();
      expect(typeof companyVacancy.vehicle_type_id === 'string').toBeTruthy();
      expect(typeof companyVacancy.quantity === 'number').toBeTruthy();
      expect(companyVacancy.is_active).toBeTruthy();
    });

    companyVacancies = companyVacancyFaker
      .withCompanyId('company id test')
      .withVehicleTypeId('vehicle id test')
      .withQuantity(5)
      .deactivate()
      .build();

    companyVacancies.forEach((companyVacancy) => {
      expect(companyVacancy.company_id).toBe('company id test');
      expect(companyVacancy.vehicle_type_id).toBe('vehicle id test');
      expect(companyVacancy.quantity).toBe(5);
      expect(companyVacancy.is_active).toBeFalsy();
    });
  });
});
