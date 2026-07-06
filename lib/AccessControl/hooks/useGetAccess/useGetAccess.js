import useCanAccess from '../useCanAccess';
import usePolicies from '../usePolicies';
import {
  ALL,
  getCanAccessFromRestriction,
} from '../../constants';

const useGetAccess = ({
  accessControlEndpoint,
  resourceEndpoint,
  resourceId,
  queryNamespaceGenerator,
  queryOptions // Shared between the queries
}) => {
  const canAccessQuery = useCanAccess({
    accessControlEndpoint,
    resourceEndpoint,
    resourceId,
    restriction: ALL,
    queryNamespaceGenerator: () => queryNamespaceGenerator(ALL, getCanAccessFromRestriction(ALL)),
    queryOptions
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
    accessControlEndpoint,
    resourceEndpoint,
    resourceId,
    queryOptions
  });

  return ({
    isLoading: isCanAccessLoading || policiesQuery.isLoading,
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
