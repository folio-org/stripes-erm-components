import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { useOkapiKy } from '@folio/stripes/core';

const usePolicies = ({
  resourceEndpoint, // This is the BASE endpoint for the resource, eg erm/sas
  resourceId,
  returnOnlyRoot = true, // Only return policies from the root owner level (Saves parsing through in cases where only the root can have policies set on it.)
  doAccessControl = false,
  isDoAccessControlLoading = false,
  queryNamespaceGenerator = () => ['AccessControl', resourceId, 'policies', resourceEndpoint],
  queryOptions = {}
}) => {
  const ky = useOkapiKy();

  // We need to fetch the policies for the resource at hand
  const policiesQuery = useQuery({
    queryKey: queryNamespaceGenerator(),
    queryFn: () => ky.get(`${resourceEndpoint}/${resourceId}/policies`).json(),
    ...queryOptions,
    enabled: queryOptions.enabled !== false &&
      !!resourceId &&
      !isDoAccessControlLoading &&
      doAccessControl
  });

  // TODO for now we can return only the policies for the root level resource.
  const rootPolicies = orderBy(policiesQuery.data, 'ownerLevel').at(-1)?.policies ?? [];

  return {
    policies: returnOnlyRoot ? rootPolicies : (policiesQuery.data ?? []),
    policiesQuery: {
      ...policiesQuery,
      isLoading: policiesQuery.isLoading || isDoAccessControlLoading
    },
  };
};

usePolicies.propTypes = {
  resourceEndpoint: PropTypes.string.isRequired,
  resourceId: PropTypes.string,
  returnOnlyRoot: PropTypes.bool,
  doAccessControl: PropTypes.bool,
  isDoAccessControlLoading: PropTypes.bool,
  queryNamespaceGenerator: PropTypes.func,
  queryOptions: PropTypes.object,
};

export default usePolicies;
