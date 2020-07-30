import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  id: () => faker.random.uuid(),
  defaultInternal: () => faker.random.boolean(),
  name: () => faker.random.words(),
  primary: () => faker.random.boolean(),
  label: () => faker.random.words(),
  description: () => faker.random.words(),
  weight: () => faker.random.number(),
  type: () => faker.random.arrayElement(
    ['com.k_int.web.toolkit.custprops.types.CustomPropertyInteger',
      'com.k_int.web.toolkit.custprops.types.CustomPropertyRefdata',
      'com.k_int.web.toolkit.custprops.types.CustomPropertyText']
  ),
});
