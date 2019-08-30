import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  personal: {
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    middleName: () => (Math.random() > 0.75 ? faker.name.firstName() : undefined),
  },
});
