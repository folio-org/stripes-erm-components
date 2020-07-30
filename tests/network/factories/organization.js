import { Factory } from 'miragejs';
import faker from '../../helpers/faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  vendorsUuid: () => faker.random.uuid(),
  name: faker.list.cycle('Economics', 'Philosophy', 'English', 'History', 'Mathematics'),
  reference: () => faker.random.word(),
});
