export default function config() {
  this.get('/licenses/org', ({ organizations }, request) => {
    if (request.queryParams.term) {
      const { term } = request.queryParams;
      return organizations.where(org => org.name.toLowerCase().includes(term.toLowerCase()));
    } else {
      return organizations.all();
    }
  });

  this.get('/erm/org', ({ organizations }, request) => {
    const { term } = request.queryParams;
    return organizations.where(org => org.name.toLowerCase().includes(term.toLowerCase()));
  });

  this.post('/erm/org', (_, request) => {
    const body = JSON.parse(request.requestBody);
    return this.create('organization', body);
  });

  this.get('/erm/contacts', ({ contacts }) => {
    return contacts.all();
  });

  this.get('/users', ({ users }) => {
    return users.all();
  });
}
