import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  embed: true,
  include: ['user'],

  serialize(object, request) {
    const { contacts } = ApplicationSerializer.prototype.serialize.call(this, object, request);
    const { params = {} } = request;

    contacts.forEach((contact, index) => {
      if (contact.user) contacts[index].user = contact.user.id;
    });

    let results = contacts;
    if (params.perPage) {
      const startIndex = params.offset || 0;
      results = contacts.slice(startIndex, params.perPage + startIndex);
    }

    return {
      totalRecords: contacts.length,
      results,
    };
  }
});
