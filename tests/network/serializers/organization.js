import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize(...args) {
    const request = args[1];
    const json = ApplicationSerializer.prototype.serialize.apply(this, args);
    if (request.method === 'GET') {
      return json.organizations;
    } else if (request.method === 'POST') {
      const { organization: { id, name } } = json;
      return { id, name };
    } else {
      return json;
    }
  }
});
