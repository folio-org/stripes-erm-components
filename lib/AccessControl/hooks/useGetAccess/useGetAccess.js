import useCanAccess from '../useCanAccess';
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
    isLoading
  } = canAccessQuery;

  return ({
    isLoading,
    canAccessQuery,
    canCreate,
    canRead,
    canEdit,
    canDelete,
    canApplyPolicies,
  });
};


export default useGetAccess;
