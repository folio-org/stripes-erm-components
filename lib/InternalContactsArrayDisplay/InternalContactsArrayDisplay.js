import React from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { Row } from '@folio/stripes/components';

import renderUserName from '../renderUserName';

const InternalContactsArrayDisplay = ({ contacts }) => {
  /* eslint-disable no-param-reassign */
  const userFetchQuery = contacts.reduce((acc, curr, index) => {
    if (index === 0) {
      acc += curr.user;
    } else {
      acc += `%20or%20id%3D%3D${curr.user}`;
    }
    return acc;
  }, '');
  /* eslint-enable no-param-reassign */

  const ky = useOkapiKy();
  const { data } = useQuery(
    // Ensure when multiple apps are using this function that each one gets memoized individually
    ['stripes-erm-components', 'registryFunctions', 'internalContactsArrayDisplay', userFetchQuery],
    () => ky(`users?limit=100&query=id%3D%3D${userFetchQuery}`).json()
  );

  const userList = contacts.map(record => {
    const role = record.role?.label ? `${record.role.label}: ` : '';
    const user = (data?.users?.find(u => u.id === record.user));
    return (
      <Row>
        {`${role}${renderUserName(user)}`}
      </Row>
    );
  });

  return userList;
};

export default InternalContactsArrayDisplay;
