import { Factory, faker, trait } from '@bigtest/mirage';

export default Factory.extend({
  role: faker.random.word(),

  afterCreate(contact, server) {
    const user = server.create('user');
    contact.user = user;
    contact.save();
  }
});
