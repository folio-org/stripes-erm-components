import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  embed: true,
  include: ['user'],

  serialize(object, request) {
    const { contacts } = ApplicationSerializer.prototype.serialize.call(this, object, request);

    contacts.forEach((contact, index) => {
      if (contact.user) contacts[index].user = contact.user.id;
    });

    return {
      totalRecords: contacts.length,
      results: contacts,
    };
  }
});
