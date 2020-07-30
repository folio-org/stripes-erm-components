import { Factory } from 'miragejs';
import faker from 'faker';

export default Factory.extend({
  role: {
    label: faker.name.title,
  },

  afterCreate(contact, server) {
    const user = server.create('user');
    contact.user = user;
    contact.save();
  }
});
