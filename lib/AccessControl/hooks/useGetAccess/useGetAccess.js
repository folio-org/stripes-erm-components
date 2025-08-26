// Currently this is handled via 5 different calls to our API (CLAIM is a different thing)
// This isn't the most ideal, so bring together in "nice" single hook
import useCanAccess from '../useCanAccess';
import {
  APPLY_POLICIES,
  CREATE,
  DELETE,
  getCanAccessFromRestriction,
  READ,
  UPDATE
} from '../../constants';

const useGetAccess = ({
  resourceEndpoint,
  resourceId,
  restrictions, // Array of restrictions to fetch,
  queryNamespaceGenerator,
  queryOptions // Shared between the queries
}) => {
  // ---------- EDIT ----------
  const canEditQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: UPDATE,
    queryNamespaceGenerator: () => queryNamespaceGenerator(UPDATE, getCanAccessFromRestriction(UPDATE)),
    queryOptions: {
      enabled: restrictions.includes(UPDATE),
      ...queryOptions
    }
  });
  const { canAccess: canEdit, isLoading: canEditLoading } = canEditQuery;

  // ---------- CREATE ----------
  const canCreateQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: CREATE,
    queryNamespaceGenerator: () => queryNamespaceGenerator(CREATE, getCanAccessFromRestriction(CREATE)),
    queryOptions: {
      enabled: restrictions.includes(CREATE),
    }
  });
  const { canAccess: canCreate, isLoading: canCreateLoading } = canCreateQuery;

  // ---------- APPLY_POLICIES ----------
  const canApplyPoliciesQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: APPLY_POLICIES,
    queryNamespaceGenerator: () => queryNamespaceGenerator(APPLY_POLICIES, getCanAccessFromRestriction(APPLY_POLICIES)),
    queryOptions: {
      enabled: restrictions.includes(APPLY_POLICIES),
    }
  });
  const { canAccess: canApplyPolicies, isLoading: canApplyPoliciesLoading } = canApplyPoliciesQuery;

  // ---------- READ ----------
  const canReadQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: READ,
    queryNamespaceGenerator: () => queryNamespaceGenerator(READ, getCanAccessFromRestriction(READ)),
    queryOptions: {
      enabled: restrictions.includes(READ),
    }
  });
  const { canAccess: canRead, isLoading: canReadLoading } = canReadQuery;

  // ---------- DELETE ----------
  const canDeleteQuery = useCanAccess({
    resourceEndpoint,
    resourceId,
    restriction: DELETE,
    queryNamespaceGenerator: () => queryNamespaceGenerator(DELETE, getCanAccessFromRestriction(DELETE)),
    queryOptions: {
      enabled: restrictions.includes(DELETE),
    }
  });
  const { canAccess: canDelete, isLoading: canDeleteLoading } = canDeleteQuery;

  return ({
    canCreate,
    canCreateLoading,
    canCreateQuery,
    canRead,
    canReadLoading,
    canReadQuery,
    canEdit,
    canEditLoading,
    canEditQuery,
    canDelete,
    canDeleteLoading,
    canDeleteQuery,
    canApplyPolicies,
    canApplyPoliciesLoading,
    canApplyPoliciesQuery
  });
};


export default useGetAccess;
