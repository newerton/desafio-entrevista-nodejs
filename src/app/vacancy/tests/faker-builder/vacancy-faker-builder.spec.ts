import { VacancyFakerBuilder } from './vacancy-faker-builder';

describe('VacancyFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = VacancyFakerBuilder.aVacancy();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('company_id prop', () => {
    const modelFaker = VacancyFakerBuilder.aVacancy();
    it('should be a function', () => {
      expect(typeof modelFaker['_company_id'] === 'function').toBeTruthy();
    });

    test('withCompanyId', () => {
      const $this = modelFaker.withCompanyId('test company_id');
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_company_id']).toBe('test company_id');

      modelFaker.withCompanyId(() => 'test company_id');
      //@ts-expect-error company_id is callable
      expect(modelFaker['_company_id']()).toBe('test company_id');

      expect(modelFaker.company_id).toBe('test company_id');
    });

    it('should pass index to company_id factory', () => {
      modelFaker.withCompanyId((index) => `test company_id ${index}`);
      const vehicle = modelFaker.build();
      expect(vehicle.company_id).toBe(`test company_id 0`);

      const fakerMany = VacancyFakerBuilder.theVacancies(2);
      fakerMany.withCompanyId((index) => `test company_id ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].company_id).toBe(`test company_id 0`);
      expect(vehicles[1].company_id).toBe(`test company_id 1`);
    });

    test('invalid empty case', () => {
      const $this = modelFaker.withInvalidCompanyIdEmpty(undefined);
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_company_id']).toBeUndefined();

      modelFaker.withInvalidCompanyIdEmpty(null);
      expect(modelFaker['_company_id']).toBeNull();

      modelFaker.withInvalidCompanyIdEmpty('');
      expect(modelFaker['_company_id']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = modelFaker.withInvalidCompanyIdTooLong();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_company_id'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      modelFaker.withInvalidCompanyIdTooLong(tooLong);
      expect(modelFaker['_company_id'].length).toBe(256);
      expect(modelFaker['_company_id']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidCompanyIdNotAString();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_company_id']).toEqual(5);

      const notAString = 123;
      modelFaker.withInvalidCompanyIdNotAString(notAString);
      expect(modelFaker['_company_id']).toBe(notAString);
    });
  });

  describe('vehicle_id prop', () => {
    const modelFaker = VacancyFakerBuilder.aVacancy();
    it('should be a function', () => {
      expect(typeof modelFaker['_vehicle_id'] === 'function').toBeTruthy();
    });

    test('withVehicleId', () => {
      const $this = modelFaker.withVehicleId('test vehicle_id');
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_vehicle_id']).toBe('test vehicle_id');

      modelFaker.withVehicleId(() => 'test vehicle_id');
      //@ts-expect-error vehicle_id is callable
      expect(modelFaker['_vehicle_id']()).toBe('test vehicle_id');

      expect(modelFaker.vehicle_id).toBe('test vehicle_id');
    });

    it('should pass index to vehicle_id factory', () => {
      modelFaker.withVehicleId((index) => `test vehicle_id ${index}`);
      const vehicle = modelFaker.build();
      expect(vehicle.vehicle_id).toBe(`test vehicle_id 0`);

      const fakerMany = VacancyFakerBuilder.theVacancies(2);
      fakerMany.withVehicleId((index) => `test vehicle_id ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].vehicle_id).toBe(`test vehicle_id 0`);
      expect(vehicles[1].vehicle_id).toBe(`test vehicle_id 1`);
    });

    test('invalid empty case', () => {
      const $this = modelFaker.withInvalidVehicleIdEmpty(undefined);
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_vehicle_id']).toBeUndefined();

      modelFaker.withInvalidVehicleIdEmpty(null);
      expect(modelFaker['_vehicle_id']).toBeNull();

      modelFaker.withInvalidVehicleIdEmpty('');
      expect(modelFaker['_vehicle_id']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = modelFaker.withInvalidVehicleIdTooLong();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_vehicle_id'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      modelFaker.withInvalidVehicleIdTooLong(tooLong);
      expect(modelFaker['_vehicle_id'].length).toBe(256);
      expect(modelFaker['_vehicle_id']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidVehicleIdNotAString();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_vehicle_id']).toEqual(5);

      const notAString = 123;
      modelFaker.withInvalidVehicleIdNotAString(notAString);
      expect(modelFaker['_vehicle_id']).toBe(notAString);
    });
  });

  describe('date_in prop', () => {
    const modelFaker = VacancyFakerBuilder.aVacancy();
    it('should be a function', () => {
      expect(typeof modelFaker['_date_in'] === 'function').toBeTruthy();
    });

    test('withDateIn', () => {
      const $this = modelFaker.withDateIn('test date_in');
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_in']).toBe('test date_in');

      modelFaker.withDateIn(() => 'test date_in');
      //@ts-expect-error date_in is callable
      expect(modelFaker['_date_in']()).toBe('test date_in');

      expect(modelFaker.date_in).toBe('test date_in');
    });

    it('should pass index to date_in factory', () => {
      modelFaker.withDateIn((index) => `test date_in ${index}`);
      const vehicle = modelFaker.build();
      expect(vehicle.date_in).toBe(`test date_in 0`);

      const fakerMany = VacancyFakerBuilder.theVacancies(2);
      fakerMany.withDateIn((index) => `test date_in ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].date_in).toBe(`test date_in 0`);
      expect(vehicles[1].date_in).toBe(`test date_in 1`);
    });

    test('invalid empty case', () => {
      const $this = modelFaker.withInvalidDateInEmpty(undefined);
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_in']).toBeUndefined();

      modelFaker.withInvalidDateInEmpty(null);
      expect(modelFaker['_date_in']).toBeNull();

      modelFaker.withInvalidDateInEmpty('');
      expect(modelFaker['_date_in']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = modelFaker.withInvalidDateInTooLong();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_in'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      modelFaker.withInvalidDateInTooLong(tooLong);
      expect(modelFaker['_date_in'].length).toBe(256);
      expect(modelFaker['_date_in']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidDateInNotAString();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_in']).toEqual(5);

      const notAString = 123;
      modelFaker.withInvalidDateInNotAString(notAString);
      expect(modelFaker['_date_in']).toBe(notAString);
    });
  });

  describe('date_out prop', () => {
    const modelFaker = VacancyFakerBuilder.aVacancy();
    it('should be a function', () => {
      expect(typeof modelFaker['_date_out'] === 'function').toBeTruthy();
    });

    test('withDateOut', () => {
      const $this = modelFaker.withDateOut('test date_out');
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_out']).toBe('test date_out');

      modelFaker.withDateOut(() => 'test date_out');
      //@ts-expect-error date_out is callable
      expect(modelFaker['_date_out']()).toBe('test date_out');

      expect(modelFaker.date_out).toBe('test date_out');
    });

    it('should pass index to date_out factory', () => {
      modelFaker.withDateOut((index) => `test date_out ${index}`);
      const vehicle = modelFaker.build();
      expect(vehicle.date_out).toBe(`test date_out 0`);

      const fakerMany = VacancyFakerBuilder.theVacancies(2);
      fakerMany.withDateOut((index) => `test date_out ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].date_out).toBe(`test date_out 0`);
      expect(vehicles[1].date_out).toBe(`test date_out 1`);
    });

    test('invalid empty case', () => {
      const $this = modelFaker.withInvalidDateOutEmpty(undefined);
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_out']).toBeUndefined();

      modelFaker.withInvalidDateOutEmpty(null);
      expect(modelFaker['_date_out']).toBeNull();

      modelFaker.withInvalidDateOutEmpty('');
      expect(modelFaker['_date_out']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = modelFaker.withInvalidDateOutTooLong();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_out'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      modelFaker.withInvalidDateOutTooLong(tooLong);
      expect(modelFaker['_date_out'].length).toBe(256);
      expect(modelFaker['_date_out']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidDateOutNotAString();
      expect($this).toBeInstanceOf(VacancyFakerBuilder);
      expect(modelFaker['_date_out']).toEqual(5);

      const notAString = 123;
      modelFaker.withInvalidDateOutNotAString(notAString);
      expect(modelFaker['_date_out']).toBe(notAString);
    });
  });

  it('should create a vehicle type', () => {
    const modelFaker = VacancyFakerBuilder.aVacancy();
    let model = modelFaker.build();

    expect(typeof model.company_id === 'undefined').toBeTruthy();
    expect(typeof model.vehicle_id === 'undefined').toBeTruthy();
    expect(typeof model.date_in === 'string').toBeTruthy();
    expect(typeof model.date_out === 'string').toBeTruthy();

    model = modelFaker
      .withCompanyId('valid company uuid')
      .withVehicleId('valid vehicle uuid')
      .withDateIn('2022-10-10 10:10:00')
      .withDateOut('2022-10-10 10:10:10')
      .build();

    expect(model.company_id).toBe('valid company uuid');
    expect(model.vehicle_id).toBe('valid vehicle uuid');
    expect(model.date_in).toBe('2022-10-10 10:10:00');
    expect(model.date_out).toBe('2022-10-10 10:10:10');
  });

  it('should create many vehicle types', () => {
    const modelFaker = VacancyFakerBuilder.theVacancies(2);
    let models = modelFaker.build();

    models.forEach((model) => {
      expect(typeof model.company_id === 'undefined').toBeTruthy();
      expect(typeof model.vehicle_id === 'undefined').toBeTruthy();
      expect(typeof model.date_in === 'string').toBeTruthy();
      expect(typeof model.date_out === 'string').toBeTruthy();
    });

    models = modelFaker
      .withCompanyId('valid company uuid')
      .withVehicleId('valid vehicle uuid')
      .withDateIn('2022-10-10 10:10:00')
      .withDateOut('2022-10-10 10:10:10')
      .build();

    models.forEach((model) => {
      expect(model.company_id).toBe('valid company uuid');
      expect(model.vehicle_id).toBe('valid vehicle uuid');
      expect(model.date_in).toBe('2022-10-10 10:10:00');
      expect(model.date_out).toBe('2022-10-10 10:10:10');
    });
  });
});
