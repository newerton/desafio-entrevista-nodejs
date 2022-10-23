import { faker } from '@faker-js/faker';

import { CompanyAddressFakerBuilder } from './company_address-faker-builder';

describe('CompanyAddressFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = CompanyAddressFakerBuilder.aAddress();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('zipcode prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(
        typeof companyAddressFaker['_zipcode'] === 'function',
      ).toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.address, 'zipCode');
      companyAddressFaker['faker'] = faker;
      companyAddressFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withZipcode', () => {
      const $this = companyAddressFaker.withZipcode('test zipcode');
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_zipcode']).toBe('test zipcode');

      companyAddressFaker.withZipcode(() => 'test zipcode');
      //@ts-expect-error zipcode is callable
      expect(companyAddressFaker['_zipcode']()).toBe('test zipcode');

      expect(companyAddressFaker.zipcode).toBe('test zipcode');
    });

    it('should pass index to zipcode factory', () => {
      companyAddressFaker.withZipcode((index) => `test zipcode ${index}`);
      const company = companyAddressFaker.build();
      expect(company.zipcode).toBe(`test zipcode 0`);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withZipcode((index) => `test zipcode ${index}`);
      const address = fakerMany.build();

      expect(address[0].zipcode).toBe(`test zipcode 0`);
      expect(address[1].zipcode).toBe(`test zipcode 1`);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidZipcodeEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_zipcode']).toBeUndefined();

      companyAddressFaker.withInvalidZipcodeEmpty(null);
      expect(companyAddressFaker['_zipcode']).toBeNull();

      companyAddressFaker.withInvalidZipcodeEmpty('');
      expect(companyAddressFaker['_zipcode']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyAddressFaker.withInvalidZipcodeTooLong();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_zipcode'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyAddressFaker.withInvalidZipcodeTooLong(tooLong);
      expect(companyAddressFaker['_zipcode'].length).toBe(256);
      expect(companyAddressFaker['_zipcode']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidZipcodeNotAString();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_zipcode']).toEqual(5);

      const notAString = 123;
      companyAddressFaker.withInvalidZipcodeNotAString(notAString);
      expect(companyAddressFaker['_zipcode']).toBe(notAString);
    });
  });

  describe('street prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(typeof companyAddressFaker['_street'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.address, 'street');
      companyAddressFaker['faker'] = faker;
      companyAddressFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withStreet', () => {
      const $this = companyAddressFaker.withStreet('test street');
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_street']).toBe('test street');

      companyAddressFaker.withStreet(() => 'test street');
      //@ts-expect-error street is callable
      expect(companyAddressFaker['_street']()).toBe('test street');

      expect(companyAddressFaker.street).toBe('test street');
    });

    it('should pass index to street factory', () => {
      companyAddressFaker.withStreet((index) => `test street ${index}`);
      const company = companyAddressFaker.build();
      expect(company.street).toBe(`test street 0`);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withStreet((index) => `test street ${index}`);
      const address = fakerMany.build();

      expect(address[0].street).toBe(`test street 0`);
      expect(address[1].street).toBe(`test street 1`);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidStreetEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_street']).toBeUndefined();

      companyAddressFaker.withInvalidStreetEmpty(null);
      expect(companyAddressFaker['_street']).toBeNull();

      companyAddressFaker.withInvalidStreetEmpty('');
      expect(companyAddressFaker['_street']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyAddressFaker.withInvalidStreetTooLong();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_street'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyAddressFaker.withInvalidStreetTooLong(tooLong);
      expect(companyAddressFaker['_street'].length).toBe(256);
      expect(companyAddressFaker['_street']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidStreetNotAString();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_street']).toEqual(5);

      const notAString = 123;
      companyAddressFaker.withInvalidStreetNotAString(notAString);
      expect(companyAddressFaker['_street']).toBe(notAString);
    });
  });

  describe('number prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(typeof companyAddressFaker['_number'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.address, 'buildingNumber');
      companyAddressFaker['faker'] = faker;
      companyAddressFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withNumber', () => {
      const $this = companyAddressFaker.withNumber('test number');
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_number']).toBe('test number');

      companyAddressFaker.withNumber(() => 'test number');
      //@ts-expect-error number is callable
      expect(companyAddressFaker['_number']()).toBe('test number');

      expect(companyAddressFaker.number).toBe('test number');
    });

    it('should pass index to number factory', () => {
      companyAddressFaker.withNumber((index) => `test number ${index}`);
      const company = companyAddressFaker.build();
      expect(company.number).toBe(`test number 0`);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withNumber((index) => `test number ${index}`);
      const address = fakerMany.build();

      expect(address[0].number).toBe(`test number 0`);
      expect(address[1].number).toBe(`test number 1`);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidNumberEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_number']).toBeUndefined();

      companyAddressFaker.withInvalidNumberEmpty(null);
      expect(companyAddressFaker['_number']).toBeNull();

      companyAddressFaker.withInvalidNumberEmpty('');
      expect(companyAddressFaker['_number']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyAddressFaker.withInvalidNumberTooLong();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_number'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyAddressFaker.withInvalidNumberTooLong(tooLong);
      expect(companyAddressFaker['_number'].length).toBe(256);
      expect(companyAddressFaker['_number']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidNumberNotAString();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_number']).toEqual(5);

      const notAString = 123;
      companyAddressFaker.withInvalidNumberNotAString(notAString);
      expect(companyAddressFaker['_number']).toBe(notAString);
    });
  });

  describe('neighborhood prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(
        typeof companyAddressFaker['_neighborhood'] === 'function',
      ).toBeTruthy();
    });

    test('withNeighborhood', () => {
      const $this = companyAddressFaker.withNeighborhood('test neighborhood');
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_neighborhood']).toBe('test neighborhood');

      companyAddressFaker.withNeighborhood(() => 'test neighborhood');
      //@ts-expect-error neighborhood is callable
      expect(companyAddressFaker['_neighborhood']()).toBe('test neighborhood');

      expect(companyAddressFaker.neighborhood).toBe('test neighborhood');
    });

    it('should pass index to neighborhood factory', () => {
      companyAddressFaker.withNeighborhood(
        (index) => `test neighborhood ${index}`,
      );
      const company = companyAddressFaker.build();
      expect(company.neighborhood).toBe(`test neighborhood 0`);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withNeighborhood((index) => `test neighborhood ${index}`);
      const address = fakerMany.build();

      expect(address[0].neighborhood).toBe(`test neighborhood 0`);
      expect(address[1].neighborhood).toBe(`test neighborhood 1`);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidNeighborhoodEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_neighborhood']).toBeUndefined();

      companyAddressFaker.withInvalidNeighborhoodEmpty(null);
      expect(companyAddressFaker['_neighborhood']).toBeNull();

      companyAddressFaker.withInvalidNeighborhoodEmpty('');
      expect(companyAddressFaker['_neighborhood']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyAddressFaker.withInvalidNeighborhoodTooLong();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_neighborhood'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyAddressFaker.withInvalidNeighborhoodTooLong(tooLong);
      expect(companyAddressFaker['_neighborhood'].length).toBe(256);
      expect(companyAddressFaker['_neighborhood']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidNeighborhoodNotAString();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_neighborhood']).toEqual(5);

      const notAString = 123;
      companyAddressFaker.withInvalidNeighborhoodNotAString(notAString);
      expect(companyAddressFaker['_neighborhood']).toBe(notAString);
    });
  });

  describe('complement prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(
        typeof companyAddressFaker['_complement'] === 'function',
      ).toBeTruthy();
    });

    test('withComplement', () => {
      const $this = companyAddressFaker.withComplement('test complement');
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_complement']).toBe('test complement');

      companyAddressFaker.withComplement(() => 'test complement');
      //@ts-expect-error complement is callable
      expect(companyAddressFaker['_complement']()).toBe('test complement');

      expect(companyAddressFaker.complement).toBe('test complement');
    });

    it('should pass index to complement factory', () => {
      companyAddressFaker.withComplement((index) => `test complement ${index}`);
      const company = companyAddressFaker.build();
      expect(company.complement).toBe(`test complement 0`);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withComplement((index) => `test complement ${index}`);
      const address = fakerMany.build();

      expect(address[0].complement).toBe(`test complement 0`);
      expect(address[1].complement).toBe(`test complement 1`);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidComplementEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_complement']).toBeUndefined();

      companyAddressFaker.withInvalidComplementEmpty(null);
      expect(companyAddressFaker['_complement']).toBeNull();

      companyAddressFaker.withInvalidComplementEmpty('');
      expect(companyAddressFaker['_complement']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyAddressFaker.withInvalidComplementTooLong();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_complement'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyAddressFaker.withInvalidComplementTooLong(tooLong);
      expect(companyAddressFaker['_complement'].length).toBe(256);
      expect(companyAddressFaker['_complement']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidComplementNotAString();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_complement']).toEqual(5);

      const notAString = 123;
      companyAddressFaker.withInvalidComplementNotAString(notAString);
      expect(companyAddressFaker['_complement']).toBe(notAString);
    });
  });

  describe('state_id prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(
        typeof companyAddressFaker['_state_id'] === 'function',
      ).toBeTruthy();
    });

    test('withStateId', () => {
      const $this = companyAddressFaker.withStateId(1);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_state_id']).toBe(1);

      companyAddressFaker.withStateId(() => 1);
      //@ts-expect-error state_id is callable
      expect(companyAddressFaker['_state_id']()).toBe(1);

      expect(companyAddressFaker.state_id).toBe(1);
    });

    it('should pass index to state_id factory', () => {
      companyAddressFaker.withStateId((index) => index);
      const company = companyAddressFaker.build();
      expect(company.state_id).toBe(0);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withStateId((index) => index);
      const address = fakerMany.build();

      expect(address[0].state_id).toBe(0);
      expect(address[1].state_id).toBe(1);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidStateIdEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_state_id']).toBeUndefined();

      companyAddressFaker.withInvalidStateIdEmpty(null);
      expect(companyAddressFaker['_state_id']).toBeNull();

      companyAddressFaker.withInvalidStateIdEmpty('');
      expect(companyAddressFaker['_state_id']).toBe('');
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidStateIdNotANumber();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_state_id']).toEqual('5');

      const notANumber = '123';
      companyAddressFaker.withInvalidStateIdNotANumber(notANumber);
      expect(companyAddressFaker['_state_id']).toBe(notANumber);
    });
  });

  describe('city_id prop', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    it('should be a function', () => {
      expect(
        typeof companyAddressFaker['_city_id'] === 'function',
      ).toBeTruthy();
    });

    test('withCityId', () => {
      const $this = companyAddressFaker.withCityId(1);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_city_id']).toBe(1);

      companyAddressFaker.withCityId(() => 1);
      //@ts-expect-error city_id is callable
      expect(companyAddressFaker['_city_id']()).toBe(1);

      expect(companyAddressFaker.city_id).toBe(1);
    });

    it('should pass index to city_id factory', () => {
      companyAddressFaker.withCityId((index) => index);
      const company = companyAddressFaker.build();
      expect(company.city_id).toBe(0);

      const fakerMany = CompanyAddressFakerBuilder.theAddresses(2);
      fakerMany.withCityId((index) => index);
      const address = fakerMany.build();

      expect(address[0].city_id).toBe(0);
      expect(address[1].city_id).toBe(1);
    });

    test('invalid empty case', () => {
      const $this = companyAddressFaker.withInvalidCityIdEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_city_id']).toBeUndefined();

      companyAddressFaker.withInvalidCityIdEmpty(null);
      expect(companyAddressFaker['_city_id']).toBeNull();

      companyAddressFaker.withInvalidCityIdEmpty('');
      expect(companyAddressFaker['_city_id']).toBe('');
    });

    test('invalid not a string case', () => {
      const $this = companyAddressFaker.withInvalidCityIdNotANumber();
      expect($this).toBeInstanceOf(CompanyAddressFakerBuilder);
      expect(companyAddressFaker['_city_id']).toEqual('5');

      const notANumber = '123';
      companyAddressFaker.withInvalidCityIdNotANumber(notANumber);
      expect(companyAddressFaker['_city_id']).toBe(notANumber);
    });
  });

  it('should create a company address', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.aAddress();
    let address = companyAddressFaker.build();

    expect(typeof address.zipcode === 'string').toBeTruthy();
    expect(typeof address.street === 'string').toBeTruthy();
    expect(typeof address.number === 'string').toBeTruthy();
    expect(typeof address.neighborhood === 'string').toBeTruthy();
    expect(typeof address.complement === 'string').toBeTruthy();
    expect(typeof address.state_id === 'number').toBeTruthy();
    expect(typeof address.city_id === 'number').toBeTruthy();

    address = companyAddressFaker
      .withZipcode('zipcode test')
      .withStreet('street test')
      .withNumber('10')
      .withNeighborhood('Centro')
      .withComplement('Ap 10')
      .withStateId(1)
      .withCityId(2)
      .build();

    expect(address.zipcode).toBe('zipcode test');
    expect(address.street).toBe('street test');
    expect(address.number).toBe('10');
    expect(address.neighborhood).toBe('Centro');
    expect(address.complement).toBe('Ap 10');
    expect(address.state_id).toBe(1);
    expect(address.city_id).toBe(2);
  });

  it('should create many address', () => {
    const companyAddressFaker = CompanyAddressFakerBuilder.theAddresses(2);
    let addresses = companyAddressFaker.build();

    addresses.forEach((address) => {
      expect(typeof address.zipcode === 'string').toBeTruthy();
      expect(typeof address.street === 'string').toBeTruthy();
      expect(typeof address.number === 'string').toBeTruthy();
      expect(typeof address.neighborhood === 'string').toBeTruthy();
      expect(typeof address.complement === 'string').toBeTruthy();
      expect(typeof address.state_id === 'number').toBeTruthy();
      expect(typeof address.city_id === 'number').toBeTruthy();
    });

    addresses = companyAddressFaker
      .withZipcode('zipcode test')
      .withStreet('street test')
      .withNumber('10')
      .withNeighborhood('Centro')
      .withComplement('Ap 10')
      .withStateId(1)
      .withCityId(2)
      .build();

    addresses.forEach((address) => {
      expect(address.zipcode).toBe('zipcode test');
      expect(address.street).toBe('street test');
      expect(address.number).toBe('10');
      expect(address.neighborhood).toBe('Centro');
      expect(address.complement).toBe('Ap 10');
      expect(address.state_id).toBe(1);
      expect(address.city_id).toBe(2);
    });
  });
});
