import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy, useStripes } from '@folio/stripes/core';

import { INTERFACES_ENDPOINT } from '../endpoints';

const useInterfaces = ({
  interfaceIds = [],
  returnQueryObject = false
}) => {
  const ky = useOkapiKy();
  const stripes = useStripes();


  const queryParams = useMemo(() => {
    const params = [];
    if (interfaceIds?.length > 0) {
      const idQuery = [
        ...new Set(interfaceIds.map(i => `id==${i}`))
      ].join(' or ');
      params.push(`query=${idQuery}`);
    }
    params.push('limit=100');

    return params;
  }, [interfaceIds]);

  const queryObject = useQuery(
    ['ERM', 'Interfaces', queryParams],
    () => ky.get(`${INTERFACES_ENDPOINT}?${queryParams.join('&')}`).json(),
    {
      enabled: (
        interfaceIds?.length > 0 &&
        stripes.hasPerm('organizations-storage.interfaces.collection.get') &&
        !!stripes.hasInterface('organizations-storage.interfaces', '2.0')
      )
    }
  );

  if (returnQueryObject) {
    return queryObject;
  }

  return queryObject?.data?.interfaces;
};

export default useInterfaces;
