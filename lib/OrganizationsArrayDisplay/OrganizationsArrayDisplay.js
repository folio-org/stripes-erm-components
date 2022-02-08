import React from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { Row } from '@folio/stripes/components';

import renderOrgsName from '../renderOrgsName';

const OrganizationsArrayDisplay = ({ organizations }) => {
  /* eslint-disable no-param-reassign */
  const orgsFetchQuery = organizations.reduce((acc, curr, index) => {
    if (index === 0) {
      acc += curr.org;
    } else {
      acc += `%20or%20id%3D%3D${curr.org}`;
    }
    return acc;
  }, '');
  /* eslint-enable no-param-reassign */

  const ky = useOkapiKy();
  const { data } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-erm-components', 'registryFunctions', 'organizationsArrayDisplay', orgsFetchQuery],
    () => ky(`organizations-storage/interfaces?limit=100&query=id%3D%3D${orgsFetchQuery}`).json()
  );

  return organizations.map(record => {
    const org = (data?.organizations?.find(o => o.id === record.org));
    return (
      <Row>
        {`${renderOrgsName(org)}`}
      </Row>
    );
  });
};

export default OrganizationsArrayDisplay;
