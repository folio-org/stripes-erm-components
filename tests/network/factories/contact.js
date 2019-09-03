import { Factory, faker } from '@bigtest/mirage';

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
