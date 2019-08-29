import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(object, request) {
    const { users } = ApplicationSerializer.prototype.serialize.call(this, object, request);
    console.log('users', JSON.stringify(users, null, ' '));

    return {
      totalRecords: users.length,
      users,
    };
  }
});
