import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';

import {
  ALL,
  APPLY_POLICIES,
  CAN_ACCESS_RESTRICTION_BASE_QUERY_KEY,
  CAN_ALL,
  CAN_APPLY_POLICIES,
  CAN_CREATE,
  CAN_DELETE,
  CAN_READ,
  CAN_UPDATE,
  CREATE,
  DELETE,
  getCanAccessFromRestriction,
  READ,
  UPDATE
} from '../../constants';

const useCanAccess = ({
  resourceEndpoint, // Should be the BASE endpoint, so erm/sas for example
  resourceId, // Optional, since CREATE works on base endpoint
  restriction,
  doAccessControl = false,
  isDoAccessControlLoading = false,
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

  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: () => ky.get(endpoint).json(),
    ...queryOptions,
    enabled: queryOptions.enabled !== false &&
      !isDoAccessControlLoading &&
      doAccessControl
  });

  const accessObj = useMemo(() => {
    if (isDoAccessControlLoading) {
      return {};
    }

    if (!doAccessControl) {
      return {
        [CAN_READ]: true,
        [CAN_CREATE]: true,
        [CAN_UPDATE]: true,
        [CAN_DELETE]: true,
        [CAN_APPLY_POLICIES]: true,
        [CAN_ALL]: true,
      };
    }

    return data ?? {};
  }, [data, doAccessControl, isDoAccessControlLoading]);

  return ({
    ...rest,
    canAccess: accessObj[getCanAccessFromRestriction(restriction)],
    canAccessObj: accessObj,
    isLoading: rest.isLoading || isDoAccessControlLoading,
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
    APPLY_POLICIES,
    ALL
  ]).isRequired,
  doAccessControl: PropTypes.bool,
  isDoAccessControlLoading: PropTypes.bool,
  queryNamespaceGenerator: PropTypes.func,
  queryOptions: PropTypes.object,
};

export default useCanAccess;
