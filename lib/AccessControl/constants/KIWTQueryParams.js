export const getPoliciesFilterFilterConfig = (filterName) => ({ name: filterName, filterPrefix: 'policiesFilter=', valuesMapping: (values) => values.join(',') });
export const POLICIES_FILTER_NAME = 'policiesFilter';
export const POLICIES_FILTER_CONFIG = getPoliciesFilterFilterConfig(POLICIES_FILTER_NAME);
