import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  personal: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
});
