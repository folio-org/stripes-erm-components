import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import {
  APPLY_POLICIES,
  CAN_ACCESS_RESTRICTION_BASE_QUERY_KEY,
  CREATE,
  DELETE, getCanAccessFromRestriction,
  READ,
  UPDATE
} from '../constants';

const useCanAccess = ({
  resourceEndpoint, // Should be the BASE endpoint, so erm/sas for example
  resourceId, // Optional, since CREATE works on base endpoint
  restriction,
  queryNamespaceGenerator,
  queryOptions = {}
}) => {
  const ky = useOkapiKy();
  const endpoint = useMemo(() => {
    if (restriction === CREATE) {
      return `${resourceEndpoint}/${getCanAccessFromRestriction(CREATE)}`;
    }

    return `${resourceEndpoint}/${resourceId}/${getCanAccessFromRestriction(restriction)}`;
  }, [resourceEndpoint, resourceId, restriction]);

  const queryKey = useMemo(() => {
    if (queryNamespaceGenerator instanceof Function) {
      return queryNamespaceGenerator();
    }

    return [...CAN_ACCESS_RESTRICTION_BASE_QUERY_KEY(restriction), resourceId, resourceEndpoint];
  }, [queryNamespaceGenerator, resourceEndpoint, resourceId, restriction]);

  const { data = {}, ...rest } = useQuery(
    queryKey,
    () => ky.get(endpoint).json(),
    queryOptions
  );

  return ({
    canAccess: data[getCanAccessFromRestriction(restriction)],
    canAccessObj: data,
    ...rest
  });
};

useCanAccess.propTypes = {
  resourceEndpoint: PropTypes.string.isRequired,
  resourceId: PropTypes.string,
  restriction: PropTypes.oneOf([
    READ,
    CREATE,
    UPDATE,
    DELETE,
    APPLY_POLICIES
  ]).isRequired,
};

export default useCanAccess;
