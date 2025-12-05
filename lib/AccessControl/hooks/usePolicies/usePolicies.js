import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { useOkapiKy } from '@folio/stripes/core';

const usePolicies = ({
  resourceEndpoint, // This is the BASE endpoint for the resource, eg erm/sas
  resourceId,
  returnOnlyRoot = true, // Only return policies from the root owner level (Saves parsing through in cases where only the root can have policies set on it.)
  queryNamespaceGenerator = () => ['AccessControl', resourceId, 'policies', resourceEndpoint],
  queryOptions = {}
}) => {
  const ky = useOkapiKy();

  // We need to fetch the policies for the resource at hand
  const policiesQuery = useQuery(
    queryNamespaceGenerator(),
    () => ky.get(`${resourceEndpoint}/${resourceId}/policies`).json(),
    {
      enabled: !!resourceId,
      ...queryOptions,
    }
  );

  // TODO for now we can return only the policies for the root level resource.
  const rootPolicies = orderBy(policiesQuery.data, 'ownerLevel').at(-1)?.policies ?? [];

  return {
    policies: returnOnlyRoot ? rootPolicies : (policiesQuery.data ?? []),
    policiesQuery,
  };
};

export default usePolicies;
