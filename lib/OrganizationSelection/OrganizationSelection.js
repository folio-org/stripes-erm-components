import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';

import { useQuery } from 'react-query';

import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

import { useOkapiKy } from '@folio/stripes/core';

import OrganizationSelectionDisplay from './OrganizationSelectionDisplay';

const OrganizationSelection = ({
  id,
  input,
  meta,
  path = 'erm/org'
}) => {
  const ky = useOkapiKy();
  const [searchString, setSearchString] = useState('');
  const [organizationsState, setOrganizationsState] = useState([]);

  // Fetch filtered Orgs list
  const queryParams = useMemo(() => (
    generateKiwtQueryParams({
      searchKey: 'name',
      // This should now work with only 10, however when an option is selected outside of the initially fetched list,
      // a second request is triggered to grab the specific organization in question,
      // and that is prepended to the top of the list, which causes obviously different
      // behaviour between selecting an org from the first 10, vs selecting an org from beyond those.
      perPage: 100,
      sort: [{ path: 'name' }]
    }, {
      query: searchString
    })
  ), [searchString]);

  const { data: { results: organizations = [] } = {}, areOrganizationsLoading } = useQuery(
    ['ERM', 'Organizations', path, queryParams],
    () => ky.get(`${path}?${queryParams?.join('&')}`).json()
  );

  // If selected option and it isn't in the orgs list above, do a second lookup for it specifically
  const { data: selectedOrganization = {}, selectedOrganizationIsLoading } = useQuery(
    ['ERM', 'Organization', input.value, path, queryParams],
    () => ky.get(`${path}/${input.value}`).json(),
    {
      enabled: !!input?.value &&
        !areOrganizationsLoading &&
        // Wait until this list is finalised (or never fire if there aren't any orgs)
        organizationsState?.length > 0 &&
        !organizationsState?.find(o => o.value === input.value)
    }
  );

  useEffect(() => {
    // Handle organizations list
    const newOrganizationsState = organizations.map(({ id: orgId, name }) => ({ value: orgId, label: name })) ?? [];
    // If an option is selected and it is /not/ in the list of orgs we just
    // fetched, unshift it onto the list so it's always available for
    // display, highlighting and selection.
    if (
      input.value &&
      !selectedOrganizationIsLoading &&
      selectedOrganization?.id
    ) {
      newOrganizationsState.unshift({ value: selectedOrganization?.id, label: selectedOrganization?.name });
    }

    if (!isEqual(organizationsState, newOrganizationsState)) {
      setOrganizationsState(newOrganizationsState);
    }
  }, [input.value, organizations, organizationsState, searchString, selectedOrganization?.id, selectedOrganization?.name, selectedOrganizationIsLoading]);

  // Selection can not handle a clear command gracefully,
  // so when string comes in as empty the last search will actually remain,
  // meaning Selection is simply inadequate as a typedown style search.
  // This isn't a regression, it's just been this bad forever.
  const updateOrgNameFilter = debounce(
    searchTerm => setSearchString(searchTerm),
    150
  );

  const handleFilter = (searchTerm) => {
    updateOrgNameFilter(searchTerm);
    return organizationsState;
  };

  const handleChange = (value) => {
    input.onChange(value);
  };

  return (
    <div data-testid="organizationSelectionDisplay">
      <OrganizationSelectionDisplay
        error={meta?.error}
        id={id}
        loading={areOrganizationsLoading}
        onChange={handleChange}
        onFilter={handleFilter}
        organizations={organizationsState}
        searchString={searchString}
        value={input.value}
      />
    </div>
  );
};

OrganizationSelection.propTypes = {
  id: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
  }),
  meta: PropTypes.object,
  path: PropTypes.string,
};

export default OrganizationSelection;
