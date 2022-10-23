import { faker } from '@faker-js/faker';

import { VehicleFakerBuilder } from './vehicle-faker-builder';

describe('VehicleFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = VehicleFakerBuilder.aVehicle();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('type prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_type'] === 'function').toBeTruthy();
    });

    test('withType', () => {
      const $this = vehicleFaker.withType('test type');
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_type']).toBe('test type');

      vehicleFaker.withType(() => 'test type');
      //@ts-expect-error type is callable
      expect(vehicleFaker['_type']()).toBe('test type');

      expect(vehicleFaker.type).toBe('test type');
    });

    it('should pass index to type factory', () => {
      vehicleFaker.withType((index) => `test type ${index}`);
      const vehicle = vehicleFaker.build();
      expect(vehicle.type).toBe(`test type 0`);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withType((index) => `test type ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].type).toBe(`test type 0`);
      expect(vehicles[1].type).toBe(`test type 1`);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidTypeEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_type']).toBeUndefined();

      vehicleFaker.withInvalidTypeEmpty(null);
      expect(vehicleFaker['_type']).toBeNull();

      vehicleFaker.withInvalidTypeEmpty('');
      expect(vehicleFaker['_type']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidTypeTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_type'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      vehicleFaker.withInvalidTypeTooLong(tooLong);
      expect(vehicleFaker['_type'].length).toBe(256);
      expect(vehicleFaker['_type']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidTypeNotAString();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_type']).toEqual(5);

      const notAString = 123;
      vehicleFaker.withInvalidTypeNotAString(notAString);
      expect(vehicleFaker['_type']).toBe(notAString);
    });
  });

  describe('brand prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_brand'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.vehicle, 'manufacturer');
      vehicleFaker['faker'] = faker;
      vehicleFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withBrand', () => {
      const $this = vehicleFaker.withBrand('test fantasy name');
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_brand']).toBe('test fantasy name');

      vehicleFaker.withBrand(() => 'test fantasy name');
      //@ts-expect-error brand is callable
      expect(vehicleFaker['_brand']()).toBe('test fantasy name');

      expect(vehicleFaker.brand).toBe('test fantasy name');
    });

    it('should pass index to brand factory', () => {
      vehicleFaker.withBrand((index) => `test fantasy name ${index}`);
      const vehicle = vehicleFaker.build();
      expect(vehicle.brand).toBe(`test fantasy name 0`);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withBrand((index) => `test fantasy name ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].brand).toBe(`test fantasy name 0`);
      expect(vehicles[1].brand).toBe(`test fantasy name 1`);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidBrandEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_brand']).toBeUndefined();

      vehicleFaker.withInvalidBrandEmpty(null);
      expect(vehicleFaker['_brand']).toBeNull();

      vehicleFaker.withInvalidBrandEmpty('');
      expect(vehicleFaker['_brand']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidBrandTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_brand'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      vehicleFaker.withInvalidBrandTooLong(tooLong);
      expect(vehicleFaker['_brand'].length).toBe(256);
      expect(vehicleFaker['_brand']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidBrandNotAString();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_brand']).toEqual(5);

      const notAString = 123;
      vehicleFaker.withInvalidBrandNotAString(notAString);
      expect(vehicleFaker['_brand']).toBe(notAString);
    });
  });

  describe('model prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_model'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.vehicle, 'model');
      vehicleFaker['faker'] = faker;
      vehicleFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withModel', () => {
      const $this = vehicleFaker.withModel('test model');
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_model']).toBe('test model');

      vehicleFaker.withModel(() => 'test model');
      //@ts-expect-error model is callable
      expect(vehicleFaker['_model']()).toBe('test model');

      expect(vehicleFaker.model).toBe('test model');
    });

    it('should pass index to model factory', () => {
      vehicleFaker.withModel((index) => `test model ${index}`);
      const vehicle = vehicleFaker.build();
      expect(vehicle.model).toBe(`test model 0`);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withModel((index) => `test model ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].model).toBe(`test model 0`);
      expect(vehicles[1].model).toBe(`test model 1`);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidModelEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_model']).toBeUndefined();

      vehicleFaker.withInvalidModelEmpty(null);
      expect(vehicleFaker['_model']).toBeNull();

      vehicleFaker.withInvalidModelEmpty('');
      expect(vehicleFaker['_model']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidModelTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_model'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      vehicleFaker.withInvalidModelTooLong(tooLong);
      expect(vehicleFaker['_model'].length).toBe(256);
      expect(vehicleFaker['_model']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidModelNotAString();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_model']).toEqual(5);

      const notAString = 123;
      vehicleFaker.withInvalidModelNotAString(notAString);
      expect(vehicleFaker['_model']).toBe(notAString);
    });
  });

  describe('color prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_color'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.vehicle, 'color');
      vehicleFaker['faker'] = faker;
      vehicleFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withColor', () => {
      const $this = vehicleFaker.withColor('test color');
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_color']).toBe('test color');

      vehicleFaker.withColor(() => 'test color');
      //@ts-expect-error color is callable
      expect(vehicleFaker['_color']()).toBe('test color');

      expect(vehicleFaker.color).toBe('test color');
    });

    it('should pass index to color factory', () => {
      vehicleFaker.withColor((index) => `test color ${index}`);
      const vehicle = vehicleFaker.build();
      expect(vehicle.color).toBe(`test color 0`);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withColor((index) => `test color ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].color).toBe(`test color 0`);
      expect(vehicles[1].color).toBe(`test color 1`);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidColorEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_color']).toBeUndefined();

      vehicleFaker.withInvalidColorEmpty(null);
      expect(vehicleFaker['_color']).toBeNull();

      vehicleFaker.withInvalidColorEmpty('');
      expect(vehicleFaker['_color']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidColorTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_color'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      vehicleFaker.withInvalidColorTooLong(tooLong);
      expect(vehicleFaker['_color'].length).toBe(256);
      expect(vehicleFaker['_color']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidColorNotAString();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_color']).toEqual(5);

      const notAString = 123;
      vehicleFaker.withInvalidColorNotAString(notAString);
      expect(vehicleFaker['_color']).toBe(notAString);
    });
  });

  describe('license_plate prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_license_plate'] === 'function').toBeTruthy();
    });

    it('should call the word method', () => {
      const spyMethod = jest.spyOn(faker.vehicle, 'vrm');
      vehicleFaker.build();

      expect(spyMethod).toHaveBeenCalled();
    });

    test('withLicensePlate', () => {
      const $this = vehicleFaker.withLicensePlate('test license_plate');
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_license_plate']).toBe('test license_plate');

      vehicleFaker.withLicensePlate(() => 'test license_plate');
      //@ts-expect-error license_plate is callable
      expect(vehicleFaker['_license_plate']()).toBe('test license_plate');

      expect(vehicleFaker.license_plate).toBe('test license_plate');
    });

    it('should pass index to license_plate factory', () => {
      vehicleFaker.withLicensePlate((index) => `test license_plate ${index}`);
      const vehicle = vehicleFaker.build();
      expect(vehicle.license_plate).toBe(`test license_plate 0`);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withLicensePlate((index) => `test license_plate ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].license_plate).toBe(`test license_plate 0`);
      expect(vehicles[1].license_plate).toBe(`test license_plate 1`);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidLicensePlateEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_license_plate']).toBeUndefined();

      vehicleFaker.withInvalidLicensePlateEmpty(null);
      expect(vehicleFaker['_license_plate']).toBeNull();

      vehicleFaker.withInvalidLicensePlateEmpty('');
      expect(vehicleFaker['_license_plate']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidLicensePlateTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_license_plate'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      vehicleFaker.withInvalidLicensePlateTooLong(tooLong);
      expect(vehicleFaker['_license_plate'].length).toBe(256);
      expect(vehicleFaker['_license_plate']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidLicensePlateNotAString();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_license_plate']).toEqual(5);

      const notAString = 123;
      vehicleFaker.withInvalidLicensePlateNotAString(notAString);
      expect(vehicleFaker['_license_plate']).toBe(notAString);
    });
  });

  describe('passenger_capacity prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(
        typeof vehicleFaker['_passenger_capacity'] === 'function',
      ).toBeTruthy();
    });

    test('withPassengerCapacity', () => {
      const $this = vehicleFaker.withPassengerCapacity(5);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_passenger_capacity']).toBe(5);

      vehicleFaker.withPassengerCapacity(() => 5);
      //@ts-expect-error passenger_capacity is callable
      expect(vehicleFaker['_passenger_capacity']()).toBe(5);

      expect(vehicleFaker.passenger_capacity).toBe(5);
    });

    it('should pass index to passenger_capacity factory', () => {
      vehicleFaker.withPassengerCapacity((index) => index);
      const vehicle = vehicleFaker.build();
      expect(vehicle.passenger_capacity).toBe(0);

      const fakerMany = VehicleFakerBuilder.theVehicles(2);
      fakerMany.withPassengerCapacity((index) => index);
      const vehicles = fakerMany.build();

      expect(vehicles[0].passenger_capacity).toBe(0);
      expect(vehicles[1].passenger_capacity).toBe(1);
    });

    test('invalid empty case', () => {
      const $this = vehicleFaker.withInvalidPassengerCapacityEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_passenger_capacity']).toBeUndefined();

      vehicleFaker.withInvalidPassengerCapacityEmpty(null);
      expect(vehicleFaker['_passenger_capacity']).toBeNull();

      vehicleFaker.withInvalidPassengerCapacityEmpty('');
      expect(vehicleFaker['_passenger_capacity']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = vehicleFaker.withInvalidPassengerCapacityTooLong();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_passenger_capacity'].toString().length).toBe(256);
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidPassengerCapacityNotANumber();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_passenger_capacity']).toEqual('5');

      const notANumber = '123';
      vehicleFaker.withInvalidPassengerCapacityNotANumber(notANumber);
      expect(vehicleFaker['_passenger_capacity']).toBe(notANumber);
    });
  });

  describe('is_active prop', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    it('should be a function', () => {
      expect(typeof vehicleFaker['_is_active'] === 'function').toBeTruthy();
    });

    test('activate', () => {
      const $this = vehicleFaker.activate();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_is_active']).toBeTruthy();
      expect(vehicleFaker.is_active).toBeTruthy();
    });

    test('deactivate', () => {
      const $this = vehicleFaker.deactivate();
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_is_active']).toBeFalsy();
      expect(vehicleFaker.is_active).toBeFalsy();
    });

    test('invalid not a string case', () => {
      const $this = vehicleFaker.withInvalidIsActiveEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_is_active']).toBeUndefined();

      vehicleFaker.withInvalidIsActiveEmpty(null);
      expect(vehicleFaker['_is_active']).toBeNull();

      vehicleFaker.withInvalidIsActiveEmpty('');
      expect(vehicleFaker['_is_active']).toBe('');
    });

    test('invalid not a boolean case', () => {
      const $this = vehicleFaker.withInvalidIsActiveNotABoolean(undefined);
      expect($this).toBeInstanceOf(VehicleFakerBuilder);
      expect(vehicleFaker['_is_active']).toBe('fake boolean');

      vehicleFaker.withInvalidIsActiveNotABoolean(null);
      expect(vehicleFaker['_is_active']).toBe('fake boolean');

      vehicleFaker.withInvalidIsActiveNotABoolean('');
      expect(vehicleFaker['_is_active']).toBe('');

      vehicleFaker.withInvalidIsActiveNotABoolean(1);
      expect(vehicleFaker['_is_active']).toBe(1);

      vehicleFaker.withInvalidIsActiveNotABoolean('a');
      expect(vehicleFaker['_is_active']).toBe('a');
    });
  });

  it('should create a vehicle', () => {
    const vehicleFaker = VehicleFakerBuilder.aVehicle();
    let vehicle = vehicleFaker.build();

    expect(typeof vehicle.type === 'string').toBeTruthy();
    expect(typeof vehicle.brand === 'string').toBeTruthy();
    expect(typeof vehicle.model === 'string').toBeTruthy();
    expect(typeof vehicle.color === 'string').toBeTruthy();
    expect(typeof vehicle.license_plate === 'string').toBeTruthy();
    expect(typeof vehicle.passenger_capacity === 'number').toBeTruthy();

    expect(vehicle.is_active).toBeTruthy();

    vehicle = vehicleFaker
      .withType('type name test')
      .withBrand('brand name test')
      .withModel('model name test')
      .withColor('color test')
      .withLicensePlate('license plate test')
      .withPassengerCapacity(5)
      .deactivate()
      .build();

    expect(vehicle.type).toBe('type name test');
    expect(vehicle.brand).toBe('brand name test');
    expect(vehicle.model).toBe('model name test');
    expect(vehicle.color).toBe('color test');
    expect(vehicle.license_plate).toBe('license plate test');
    expect(vehicle.passenger_capacity).toBe(5);
    expect(vehicle.is_active).toBeFalsy();
  });

  it('should create many vehicles', () => {
    const vehicleFaker = VehicleFakerBuilder.theVehicles(2);
    let vehicles = vehicleFaker.build();

    vehicles.forEach((vehicle) => {
      expect(typeof vehicle.type === 'string').toBeTruthy();
      expect(typeof vehicle.brand === 'string').toBeTruthy();
      expect(typeof vehicle.model === 'string').toBeTruthy();
      expect(typeof vehicle.color === 'string').toBeTruthy();
      expect(typeof vehicle.license_plate === 'string').toBeTruthy();
      expect(typeof vehicle.passenger_capacity === 'number').toBeTruthy();
      expect(vehicle.is_active).toBeTruthy();
    });

    vehicles = vehicleFaker
      .withType('type name test')
      .withBrand('brand name test')
      .withModel('model name test')
      .withColor('color test')
      .withLicensePlate('license plate test')
      .withPassengerCapacity(5)
      .deactivate()
      .build();

    vehicles.forEach((vehicle) => {
      expect(vehicle.type).toBe('type name test');
      expect(vehicle.brand).toBe('brand name test');
      expect(vehicle.model).toBe('model name test');
      expect(vehicle.color).toBe('color test');
      expect(vehicle.license_plate).toBe('license plate test');
      expect(vehicle.passenger_capacity).toBe(5);
      expect(vehicle.is_active).toBeFalsy();
    });
  });
});
