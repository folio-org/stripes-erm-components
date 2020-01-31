export default (options) => (queryParams, pathComponents, resources, logger, props) => {
  const {
    searchKey = '',
    filterKeyDefault = '.value',
    filterKeys = {},
    filterConfig = [],
    queryGetter = (r) => r.query,
    rawFilterNames = [],
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
    params.filters = filters.split(',');
  }

  if (0 && filters) {
    params.filters = [];

    // Split up the `filters` query string into individual filters
    // and group them if they're filtering on the same property.
    const filterMap = {};
    const splitFilters = filters.split(',');

    const standardFilters = splitFilters.filter(filter => (
      rawFilterNames.some(rawFilterName => filter.startsWith(rawFilterName)) === false
    ));

    const rawFilters = splitFilters.filter(filter => (
      rawFilterNames.some(rawFilterName => filter.startsWith(rawFilterName)) === true
    ));

    /*
    standardFilters
    [
      'status==active',
      'status==expired',
      'type==local',
    ]
    */

    filters.split('&&').forEach(filter => {
      const separatorIndex = filter.lastIndexOf('.');
      const propertyName = filter.substring(0, separatorIndex);
      const label = filter.substring(separatorIndex + 1);
      if (!filterMap[propertyName]) filterMap[propertyName] = [];

      filterMap[propertyName].push(label);
    });

    // Construct the actual `filters` query string we're going to use.
    // Note that multiple filters on the same property must be joined
    // together into the same param to act as a union rather than an intersection.
    // e.g., filters=["status.value==Draft||status.value==Active", "priority.value==High"]
    Object.entries(filterMap).forEach(([name, values]) => {
      let filterKey = `${name}${filterKeyDefault}`;
      if (filterKeys[name]) filterKey = filterKeys[name];

      const filter = values
        // Check if the `value` rather than `name` should be used as the filter value.
        .map(value => {
          const config = filterConfig.find(c => c.name === name);
          if (!config || !config.values) return value;

          const valueObject = config.values.find(v => v.name === value);
          if (!valueObject || !valueObject.value) return value;

          filterKey = name;

          return valueObject.value;
        })
        // Construct the actual filter string
        .map(value => `${filterKey}==${value}`)
        .join('||');

      params.filters.push(filter);
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
