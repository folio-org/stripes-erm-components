import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from 'react-query';

import { generateKiwtQuery, highlightString, QueryTypedown } from '@k-int/stripes-kint-components';

import { AppIcon, useOkapiKy } from '@folio/stripes/core';

const OrganizationSelection = ({
  displayClearItem = false,
  id,
  input,
  meta,
  path = 'erm/org'
}) => {
  const ky = useOkapiKy();
  const [selectedOrganization, setSelectedOrganization] = useState({});
  // If selected option and it isn't in the orgs list above, do a lookup for it specifically
  useQuery(
    ['ERM', 'Organization', input.value, path],
    () => ky.get(`${path}/${input.value}`).json().then(
      res => setSelectedOrganization(res)
    ),
    {
      enabled: !!input?.value &&
        !selectedOrganization?.id
    }
  );

  useEffect(() => {
    if (!input.value && !!selectedOrganization?.id) {
      setSelectedOrganization({});
    }
  }, [input.value, selectedOrganization?.id]);

  return (
    <QueryTypedown
      displayClearItem={displayClearItem}
      id={id}
      input={{
        ...input,
        onChange: value => {
          input.onChange(value?.id);
          setSelectedOrganization(value);
        },
        value: selectedOrganization
      }}
      meta={meta}
      path={path}
      pathMutator={(inp, p) => {
        const query = generateKiwtQuery(
          { searchKey: 'name', stats: false },
          { query: inp, sort: 'name' }
        );
        return `${p}${query}`;
      }}
      renderListItem={(org, inp) => {
        return (
          <AppIcon
            app="organizations"
            size="small"
          >
            {highlightString(inp, org.name)}
          </AppIcon>
        );
      }}
    />
  );
};

OrganizationSelection.propTypes = {
  displayClearItem: PropTypes.bool,
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
