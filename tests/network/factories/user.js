import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  personal: {
    firstName: faker.name.firstName,
    lastName: faker.name.lastName,
    middleName: () => (Math.random() > 0.75 ? faker.name.firstName() : undefined),
  },
});
