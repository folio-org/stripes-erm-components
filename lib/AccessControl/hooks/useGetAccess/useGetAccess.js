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
  queryOptions // Shared between the queries
}) => {
  const { doAccessControl, isDoAccessControlLoading } = useDoAccessControl({ endpoint: accessControlEndpoint });

  const canAccessQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: ALL,
    queryNamespaceGenerator: () => queryNamespaceGenerator(ALL, getCanAccessFromRestriction(ALL)),
    queryOptions,
    doAccessControl,
    isDoAccessControlLoading
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
    queryOptions,
    doAccessControl,
    isDoAccessControlLoading
  });

  return ({
    isLoading: isCanAccessLoading || policiesQuery.isLoading || isDoAccessControlLoading,
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
