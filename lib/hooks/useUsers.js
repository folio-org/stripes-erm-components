import { useQuery } from 'react-query';

import { useOkapiKy, useStripes } from '@folio/stripes/core';

const useUsers = (userIds = [], queryParams = {}) => {
  const stripes = useStripes();
  /* Behaviour needs to be refactored.
     The query variable is either a string or an empty array,
     we need to refactor that at some point to always be a string.
  */
  let query = userIds.map(uid => `id==${uid}`).join(' or ') ?? [];
  if (query?.length) {
    query += '&limit=1000';
  }

  const { enabled, ...restOfQueryParams } = queryParams;

  const ky = useOkapiKy();
  const queryObject = useQuery(
    ['ERM', 'users', 'stripes-erm-components', 'useUsers', userIds],
    () => ky.get(`users?query=${query}`).json(),
    {
      enabled: (
        !!query?.length &&
        (
          !!stripes.hasInterface('users', '15.0') ||
          !!stripes.hasInterface('users', '16.0')
        ) &&
        stripes.hasPerm('users.collection.get')
      ) && enabled,
      ...restOfQueryParams
    }
  );

  if (!userIds?.length) {
    return {};
  }

  return queryObject;
};

export default useUsers;
