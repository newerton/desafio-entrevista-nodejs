import { faker } from '@faker-js/faker';
import { cnpj } from 'cpf-cnpj-validator';

import { CompanyFakerBuilder } from './company-faker-builder';

describe('CompanyFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = CompanyFakerBuilder.aCompany();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('social_name prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_social_name'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.company, 'name');
      companyFaker['faker'] = faker;
      companyFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withSocialName', () => {
      const $this = companyFaker.withSocialName('test social_name');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_social_name']).toBe('test social_name');

      companyFaker.withSocialName(() => 'test social_name');
      //@ts-expect-error social_name is callable
      expect(companyFaker['_social_name']()).toBe('test social_name');

      expect(companyFaker.social_name).toBe('test social_name');
    });

    it('should pass index to social_name factory', () => {
      companyFaker.withSocialName((index) => `test social_name ${index}`);
      const company = companyFaker.build();
      expect(company.social_name).toBe(`test social_name 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withSocialName((index) => `test social_name ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].social_name).toBe(`test social_name 0`);
      expect(companies[1].social_name).toBe(`test social_name 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidSocialNameEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_social_name']).toBeUndefined();

      companyFaker.withInvalidSocialNameEmpty(null);
      expect(companyFaker['_social_name']).toBeNull();

      companyFaker.withInvalidSocialNameEmpty('');
      expect(companyFaker['_social_name']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidSocialNameTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_social_name'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidSocialNameTooLong(tooLong);
      expect(companyFaker['_social_name'].length).toBe(256);
      expect(companyFaker['_social_name']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidSocialNameNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_social_name']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidSocialNameNotAString(notAString);
      expect(companyFaker['_social_name']).toBe(notAString);
    });
  });

  describe('fantasy_name prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_fantasy_name'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.company, 'name');
      companyFaker['faker'] = faker;
      companyFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withFantasyName', () => {
      const $this = companyFaker.withFantasyName('test fantasy name');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_fantasy_name']).toBe('test fantasy name');

      companyFaker.withFantasyName(() => 'test fantasy name');
      //@ts-expect-error fantasy_name is callable
      expect(companyFaker['_fantasy_name']()).toBe('test fantasy name');

      expect(companyFaker.fantasy_name).toBe('test fantasy name');
    });

    it('should pass index to fantasy_name factory', () => {
      companyFaker.withFantasyName((index) => `test fantasy name ${index}`);
      const company = companyFaker.build();
      expect(company.fantasy_name).toBe(`test fantasy name 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withFantasyName((index) => `test fantasy name ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].fantasy_name).toBe(`test fantasy name 0`);
      expect(companies[1].fantasy_name).toBe(`test fantasy name 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidFantasyNameEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_fantasy_name']).toBeUndefined();

      companyFaker.withInvalidFantasyNameEmpty(null);
      expect(companyFaker['_fantasy_name']).toBeNull();

      companyFaker.withInvalidFantasyNameEmpty('');
      expect(companyFaker['_fantasy_name']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidFantasyNameTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_fantasy_name'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidFantasyNameTooLong(tooLong);
      expect(companyFaker['_fantasy_name'].length).toBe(256);
      expect(companyFaker['_fantasy_name']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidFantasyNameNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_fantasy_name']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidFantasyNameNotAString(notAString);
      expect(companyFaker['_fantasy_name']).toBe(notAString);
    });
  });

  describe('email prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_email'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.internet, 'email');
      companyFaker['faker'] = faker;
      companyFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withEmail', () => {
      const $this = companyFaker.withEmail('test email');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_email']).toBe('test email');

      companyFaker.withEmail(() => 'test email');
      //@ts-expect-error email is callable
      expect(companyFaker['_email']()).toBe('test email');

      expect(companyFaker.email).toBe('test email');
    });

    it('should pass index to email factory', () => {
      companyFaker.withEmail((index) => `test email ${index}`);
      const company = companyFaker.build();
      expect(company.email).toBe(`test email 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withEmail((index) => `test email ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].email).toBe(`test email 0`);
      expect(companies[1].email).toBe(`test email 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidEmailEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_email']).toBeUndefined();

      companyFaker.withInvalidEmailEmpty(null);
      expect(companyFaker['_email']).toBeNull();

      companyFaker.withInvalidEmailEmpty('');
      expect(companyFaker['_email']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidEmailTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_email'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidEmailTooLong(tooLong);
      expect(companyFaker['_email'].length).toBe(256);
      expect(companyFaker['_email']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidEmailNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_email']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidEmailNotAString(notAString);
      expect(companyFaker['_email']).toBe(notAString);
    });
  });

  describe('password prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_password'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.internet, 'password');
      companyFaker['faker'] = faker;
      companyFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withPassword', () => {
      const $this = companyFaker.withPassword('test password');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_password']).toBe('test password');

      companyFaker.withPassword(() => 'test password');
      //@ts-expect-error password is callable
      expect(companyFaker['_password']()).toBe('test password');

      expect(companyFaker.password).toBe('test password');
    });

    it('should pass index to password factory', () => {
      companyFaker.withPassword((index) => `test password ${index}`);
      const company = companyFaker.build();
      expect(company.password).toBe(`test password 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withPassword((index) => `test password ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].password).toBe(`test password 0`);
      expect(companies[1].password).toBe(`test password 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidPasswordEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_password']).toBeUndefined();

      companyFaker.withInvalidPasswordEmpty(null);
      expect(companyFaker['_password']).toBeNull();

      companyFaker.withInvalidPasswordEmpty('');
      expect(companyFaker['_password']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidPasswordTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_password'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidPasswordTooLong(tooLong);
      expect(companyFaker['_password'].length).toBe(256);
      expect(companyFaker['_password']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidPasswordNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_password']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidPasswordNotAString(notAString);
      expect(companyFaker['_password']).toBe(notAString);
    });
  });

  describe('document prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_document'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(cnpj, 'generate');
      companyFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withDocument', () => {
      const $this = companyFaker.withDocument('test document');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_document']).toBe('test document');

      companyFaker.withDocument(() => 'test document');
      //@ts-expect-error document is callable
      expect(companyFaker['_document']()).toBe('test document');

      expect(companyFaker.document).toBe('test document');
    });

    it('should pass index to document factory', () => {
      companyFaker.withDocument((index) => `test document ${index}`);
      const company = companyFaker.build();
      expect(company.document).toBe(`test document 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withDocument((index) => `test document ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].document).toBe(`test document 0`);
      expect(companies[1].document).toBe(`test document 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidDocumentEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_document']).toBeUndefined();

      companyFaker.withInvalidDocumentEmpty(null);
      expect(companyFaker['_document']).toBeNull();

      companyFaker.withInvalidDocumentEmpty('');
      expect(companyFaker['_document']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidDocumentTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_document'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidDocumentTooLong(tooLong);
      expect(companyFaker['_document'].length).toBe(256);
      expect(companyFaker['_document']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidDocumentNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_document']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidDocumentNotAString(notAString);
      expect(companyFaker['_document']).toBe(notAString);
    });
  });

  describe('phone prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_phone'] === 'function').toBeTruthy();
    });

    test('withPhone', () => {
      const $this = companyFaker.withPhone('test phone');
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_phone']).toBe('test phone');

      companyFaker.withPhone(() => 'test phone');
      //@ts-expect-error phone is callable
      expect(companyFaker['_phone']()).toBe('test phone');

      expect(companyFaker.phone).toBe('test phone');
    });

    it('should pass index to phone factory', () => {
      companyFaker.withPhone((index) => `test phone ${index}`);
      const company = companyFaker.build();
      expect(company.phone).toBe(`test phone 0`);

      const fakerMany = CompanyFakerBuilder.theCompanies(2);
      fakerMany.withPhone((index) => `test phone ${index}`);
      const companies = fakerMany.build();

      expect(companies[0].phone).toBe(`test phone 0`);
      expect(companies[1].phone).toBe(`test phone 1`);
    });

    test('invalid empty case', () => {
      const $this = companyFaker.withInvalidPhoneEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_phone']).toBeUndefined();

      companyFaker.withInvalidPhoneEmpty(null);
      expect(companyFaker['_phone']).toBeNull();

      companyFaker.withInvalidPhoneEmpty('');
      expect(companyFaker['_phone']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = companyFaker.withInvalidPhoneTooLong();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_phone'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      companyFaker.withInvalidPhoneTooLong(tooLong);
      expect(companyFaker['_phone'].length).toBe(256);
      expect(companyFaker['_phone']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidPhoneNotAString();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_phone']).toEqual(5);

      const notAString = 123;
      companyFaker.withInvalidPhoneNotAString(notAString);
      expect(companyFaker['_phone']).toBe(notAString);
    });
  });

  describe('is_active prop', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    it('should be a function', () => {
      expect(typeof companyFaker['_is_active'] === 'function').toBeTruthy();
    });

    test('activate', () => {
      const $this = companyFaker.activate();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_is_active']).toBeTruthy();
      expect(companyFaker.is_active).toBeTruthy();
    });

    test('deactivate', () => {
      const $this = companyFaker.deactivate();
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_is_active']).toBeFalsy();
      expect(companyFaker.is_active).toBeFalsy();
    });

    test('invalid not a string case', () => {
      const $this = companyFaker.withInvalidIsActiveEmpty(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_is_active']).toBeUndefined();

      companyFaker.withInvalidIsActiveEmpty(null);
      expect(companyFaker['_is_active']).toBeNull();

      companyFaker.withInvalidIsActiveEmpty('');
      expect(companyFaker['_is_active']).toBe('');
    });

    test('invalid not a boolean case', () => {
      const $this = companyFaker.withInvalidIsActiveNotABoolean(undefined);
      expect($this).toBeInstanceOf(CompanyFakerBuilder);
      expect(companyFaker['_is_active']).toBe('fake boolean');

      companyFaker.withInvalidIsActiveNotABoolean(null);
      expect(companyFaker['_is_active']).toBe('fake boolean');

      companyFaker.withInvalidIsActiveNotABoolean('');
      expect(companyFaker['_is_active']).toBe('');

      companyFaker.withInvalidIsActiveNotABoolean(1);
      expect(companyFaker['_is_active']).toBe(1);

      companyFaker.withInvalidIsActiveNotABoolean('a');
      expect(companyFaker['_is_active']).toBe('a');
    });
  });

  it('should create a company', () => {
    const companyFaker = CompanyFakerBuilder.aCompany();
    let company = companyFaker.build();

    expect(typeof company.social_name === 'string').toBeTruthy();
    expect(typeof company.fantasy_name === 'string').toBeTruthy();

    expect(company.is_active).toBeTruthy();

    company = companyFaker
      .withSocialName('social name test')
      .withFantasyName('fantasy name test')
      .withEmail('email@email.com')
      .withPassword('123456')
      .withDocument('0123456789')
      .withPhone('(11) 9 9876-5432')
      .deactivate()
      .build();

    expect(company.social_name).toBe('social name test');
    expect(company.fantasy_name).toBe('fantasy name test');
    expect(company.email).toBe('email@email.com');
    expect(company.password).toBe('123456');
    expect(company.document).toBe('0123456789');
    expect(company.phone).toBe('(11) 9 9876-5432');
    expect(company.is_active).toBeFalsy();
  });

  it('should create many companies', () => {
    const companyFaker = CompanyFakerBuilder.theCompanies(2);
    let companies = companyFaker.build();

    companies.forEach((company) => {
      expect(typeof company.social_name === 'string').toBeTruthy();
      expect(typeof company.fantasy_name === 'string').toBeTruthy();
      expect(typeof company.email === 'string').toBeTruthy();
      expect(typeof company.password === 'string').toBeTruthy();
      expect(typeof company.document === 'string').toBeTruthy();
      expect(typeof company.phone === 'string').toBeTruthy();
      expect(company.is_active).toBeTruthy();
    });

    companies = companyFaker
      .withSocialName('social name test')
      .withFantasyName('fantasy name test')
      .withEmail('email@email.com')
      .withPassword('123456')
      .withDocument('0123456789')
      .withPhone('(11) 9 9876-5432')
      .deactivate()
      .build();

    companies.forEach((company) => {
      expect(company.social_name).toBe('social name test');
      expect(company.fantasy_name).toBe('fantasy name test');
      expect(company.email).toBe('email@email.com');
      expect(company.password).toBe('123456');
      expect(company.document).toBe('0123456789');
      expect(company.phone).toBe('(11) 9 9876-5432');
      expect(company.is_active).toBeFalsy();
    });
  });
});
