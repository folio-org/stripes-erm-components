export default (options) => (queryParams, pathComponents, resources, logger, props) => {
  const {
    searchKey = '',
    filterKeys = {},
    queryGetter = (r) => r.query,
  } = options;

  const params = {
    stats: 'true',
  };

  const { qindex, query, filters, sort } = queryGetter(resources, props);

  if (query) {
    params.match = (qindex || searchKey).split(',');
    params.term = query;
  }

  if (filters) {
    const filterMap = {};
    filters.split(',').forEach(filter => {
      const [filterName, ...rest] = filter.split('.');
      const filterValue = rest.join('.');

      if (filterMap[filterName] === undefined) filterMap[filterName] = [];
      filterMap[filterName].push(filterValue);
    });

    // We now have a filterMap of shape { status: ['active', 'cancelled'], type: ['local'] }
    params.filters = [];
    Object.entries(filterMap).forEach(([filterName, filterValues]) => {
      const filterKey = filterKeys[filterName];

      if (!filterKey) {
        // These filters have no key mapping so we just pass the values to the backend as-is.
        params.filters.push(...filterValues);
      } else {
        params.filters.push(filterValues.map(v => `${filterKey}==${v}`).join('||'));
      }
    });
  }

  if (sort) {
    params.sort = sort.split(',').map(sortKey => {
      const descending = sortKey.startsWith('-');
      const term = sortKey.replace('-', '');

      return `${term};${descending ? 'desc' : 'asc'}`;
    });
  }

  return params;
};
