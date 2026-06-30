import { useMemo } from 'react';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { useOkapiKy } from '@folio/stripes/core';

import useEnabledEngines from '../useEnabledEngines';

const usePolicies = ({
  accessControlEndpoint = null,
  resourceEndpoint, // This is the BASE endpoint for the resource, eg erm/sas
  resourceId,
  returnOnlyRoot = true, // Only return policies from the root owner level (Saves parsing through in cases where only the root can have policies set on it.)
  queryNamespaceGenerator = () => ['AccessControl', resourceId, 'policies', resourceEndpoint],
  queryOptions = {}
}) => {
  const ky = useOkapiKy();

  const inferredAccessControlEndpoint = useMemo(() => {
    return accessControlEndpoint ?? (resourceEndpoint ? resourceEndpoint.split('/')[0] + '/accessControl' : null);
  }, [accessControlEndpoint, resourceEndpoint]);

  const { enabledEngines, isLoading: isEnabledEnginesLoading } = useEnabledEngines({ endpoint: inferredAccessControlEndpoint });
  const enginesEnabled = useMemo(() => Object.values(enabledEngines).some(v => v === true), [enabledEngines]);

  // We need to fetch the policies for the resource at hand
  const policiesQuery = useQuery(
    queryNamespaceGenerator(),
    () => ky.get(`${resourceEndpoint}/${resourceId}/policies`).json(),
    {
      ...queryOptions,
      enabled: queryOptions.enabled !== false &&
        !!resourceId &&
        !isEnabledEnginesLoading &&
        enginesEnabled,
    }
  );

  // TODO for now we can return only the policies for the root level resource.
  const rootPolicies = orderBy(policiesQuery.data, 'ownerLevel').at(-1)?.policies ?? [];

  return {
    policies: returnOnlyRoot ? rootPolicies : (policiesQuery.data ?? []),
    policiesQuery: {
      ...policiesQuery,
      isLoading: (policiesQuery.isLoading && enginesEnabled) || isEnabledEnginesLoading
    },
  };
};

export default usePolicies;
