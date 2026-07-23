import { useMemo } from "react";

import useCanAccess from '../useCanAccess';
import usePolicies from '../usePolicies';
import useDoAccessControl from '../useDoAccessControl';
import {
  ALL,
  getCanAccessFromRestriction,
} from '../../constants';

const useGetAccess = ({
  accessControlEndpoint,
  resourceEndpoint,
  resourceId,
  queryNamespaceGenerator,
  policiesQueryNamespaceGenerator,
  queryOptions = {} // Shared between the queries
}) => {
  const { doAccessControl, enabledEnginesQuery } = useDoAccessControl({ endpoint: accessControlEndpoint });

  const queriesEnabled = useMemo(() => {
    if (queryOptions.enabled !== undefined) {
      return queryOptions.enabled && !enabledEnginesQuery.isLoading && doAccessControl;
    }
    return !enabledEnginesQuery.isLoading && doAccessControl;
  }, [doAccessControl, enabledEnginesQuery.isLoading, queryOptions.enabled]);

  const canAccessQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: ALL,
    queryNamespaceGenerator: () => queryNamespaceGenerator(ALL, getCanAccessFromRestriction(ALL)),
    queryOptions: {
      ...queryOptions,
      enabled: queriesEnabled,
    }
  });

  const {
    canAccessObj: {
      canApplyPolicies,
      canCreate,
      canDelete,
      canRead,
      canUpdate: canEdit
    } = {},
    isLoading: isCanAccessLoading
  } = canAccessQuery;

  const { policies, policiesQuery } = usePolicies({
    resourceEndpoint,
    resourceId,
    queryNamespaceGenerator: policiesQueryNamespaceGenerator,
    queryOptions: {
      ...queryOptions,
      enabled: queriesEnabled,
    }
  });

  return ({
    isLoading: isCanAccessLoading || policiesQuery.isLoading || enabledEnginesQuery.isLoading,
    canAccessQuery,
    canCreate,
    canRead,
    canEdit,
    canDelete,
    canApplyPolicies,
    policies,
    policiesQuery
  });
};


export default useGetAccess;
