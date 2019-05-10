import { Factory, faker } from '@bigtest/mirage';

export default Factory.extend({
  id: () => faker.random.uuid(),
  vendorsUuid: () => faker.random.uuid(),
  name: faker.list.cycle('Economics', 'Philosophy', 'English', 'History', 'Mathematics'),
  reference: () => faker.random.word(),
});
