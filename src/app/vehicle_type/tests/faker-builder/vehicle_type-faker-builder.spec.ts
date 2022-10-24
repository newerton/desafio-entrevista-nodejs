import { VehicleTypeFakerBuilder } from './vehicle_type-faker-builder';

describe('VehicleTypeFakerBuilder Unit Tests', () => {
  describe('id prop', () => {
    const faker = VehicleTypeFakerBuilder.aVehicleType();

    it('should throw error when any with methods has called', () => {
      expect(() => faker['getValue']('id')).toThrow(
        new Error("Property id not have a factory, use 'with' methods"),
      );
    });
  });

  describe('name prop', () => {
    const modelFaker = VehicleTypeFakerBuilder.aVehicleType();
    it('should be a function', () => {
      expect(typeof modelFaker['_name'] === 'function').toBeTruthy();
    });

    test('withName', () => {
      const $this = modelFaker.withName('test fantasy name');
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_name']).toBe('test fantasy name');

      modelFaker.withName(() => 'test fantasy name');
      //@ts-expect-error name is callable
      expect(modelFaker['_name']()).toBe('test fantasy name');

      expect(modelFaker.name).toBe('test fantasy name');
    });

    it('should pass index to name factory', () => {
      modelFaker.withName((index) => `test fantasy name ${index}`);
      const vehicle = modelFaker.build();
      expect(vehicle.name).toBe(`test fantasy name 0`);

      const fakerMany = VehicleTypeFakerBuilder.theVehicleTypes(2);
      fakerMany.withName((index) => `test fantasy name ${index}`);
      const vehicles = fakerMany.build();

      expect(vehicles[0].name).toBe(`test fantasy name 0`);
      expect(vehicles[1].name).toBe(`test fantasy name 1`);
    });

    test('invalid empty case', () => {
      const $this = modelFaker.withInvalidNameEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_name']).toBeUndefined();

      modelFaker.withInvalidNameEmpty(null);
      expect(modelFaker['_name']).toBeNull();

      modelFaker.withInvalidNameEmpty('');
      expect(modelFaker['_name']).toBe('');
    });

    test('invalid too long case', () => {
      const $this = modelFaker.withInvalidNameTooLong();
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_name'].length).toBe(256);

      const tooLong = 'a'.repeat(256);
      modelFaker.withInvalidNameTooLong(tooLong);
      expect(modelFaker['_name'].length).toBe(256);
      expect(modelFaker['_name']).toBe(tooLong);
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidNameNotAString();
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_name']).toEqual(5);

      const notAString = 123;
      modelFaker.withInvalidNameNotAString(notAString);
      expect(modelFaker['_name']).toBe(notAString);
    });
  });

  describe('is_active prop', () => {
    const modelFaker = VehicleTypeFakerBuilder.aVehicleType();
    it('should be a function', () => {
      expect(typeof modelFaker['_is_active'] === 'function').toBeTruthy();
    });

    test('activate', () => {
      const $this = modelFaker.activate();
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_is_active']).toBeTruthy();
      expect(modelFaker.is_active).toBeTruthy();
    });

    test('deactivate', () => {
      const $this = modelFaker.deactivate();
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_is_active']).toBeFalsy();
      expect(modelFaker.is_active).toBeFalsy();
    });

    test('invalid not a string case', () => {
      const $this = modelFaker.withInvalidIsActiveEmpty(undefined);
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_is_active']).toBeUndefined();

      modelFaker.withInvalidIsActiveEmpty(null);
      expect(modelFaker['_is_active']).toBeNull();

      modelFaker.withInvalidIsActiveEmpty('');
      expect(modelFaker['_is_active']).toBe('');
    });

    test('invalid not a boolean case', () => {
      const $this = modelFaker.withInvalidIsActiveNotABoolean(undefined);
      expect($this).toBeInstanceOf(VehicleTypeFakerBuilder);
      expect(modelFaker['_is_active']).toBe('fake boolean');

      modelFaker.withInvalidIsActiveNotABoolean(null);
      expect(modelFaker['_is_active']).toBe('fake boolean');

      modelFaker.withInvalidIsActiveNotABoolean('');
      expect(modelFaker['_is_active']).toBe('');

      modelFaker.withInvalidIsActiveNotABoolean(1);
      expect(modelFaker['_is_active']).toBe(1);

      modelFaker.withInvalidIsActiveNotABoolean('a');
      expect(modelFaker['_is_active']).toBe('a');
    });
  });

  it('should create a vehicle type', () => {
    const modelFaker = VehicleTypeFakerBuilder.aVehicleType();
    let model = modelFaker.build();

    expect(typeof model.name === 'string').toBeTruthy();

    expect(model.is_active).toBeTruthy();

    model = modelFaker.withName('name test').deactivate().build();

    expect(model.name).toBe('name test');
    expect(model.is_active).toBeFalsy();
  });

  it('should create many vehicle types', () => {
    const modelFaker = VehicleTypeFakerBuilder.theVehicleTypes(2);
    let models = modelFaker.build();

    models.forEach((model) => {
      expect(typeof model.name === 'string').toBeTruthy();
      expect(model.is_active).toBeTruthy();
    });

    models = modelFaker.withName('name test').deactivate().build();

    models.forEach((model) => {
      expect(model.name).toBe('name test');
      expect(model.is_active).toBeFalsy();
    });
  });
});
