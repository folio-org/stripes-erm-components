import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(object, request) {
    const { users } = ApplicationSerializer.prototype.serialize.call(this, object, request);

    return {
      totalRecords: users.length,
      users,
    };
  }
});
