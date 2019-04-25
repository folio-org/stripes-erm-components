export default function config() {
  this.get('/licenses/org', ({ organizations }, request) => {
    if (request.queryParams.term) {
      const { term } = request.queryParams;
      return organizations.where(org => org.name.toLowerCase().includes(term.toLowerCase()));
    } else {
      return organizations.all();
    }
  });
}
