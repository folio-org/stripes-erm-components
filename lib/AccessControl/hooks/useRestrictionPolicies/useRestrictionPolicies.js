import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import { getPoliciesFromRestriction, RESTRICTIONS } from '../../constants';
import { policiesFlattener } from '../../utils';

const useRestrictionPolicies = ({
  doAccessControl = false,
  endpoint, // This should be the base accessControl endpoint, such as erm/accessControl
  policyType, // If null, fetch all, else filter by queryType
  queryOptions,
  restriction, // This is a MANDATORY prop, CLAIM vs READ etc
}) => {
  const ky = useOkapiKy();
  const kySearchOptions = useMemo(() => {
    if (policyType) {
      return ({ searchParams: `type=${policyType}` });
    }

    return ({});
  }, [policyType]);

  const restrictionPoliciesString = getPoliciesFromRestriction(restriction);
  const { data: { [restrictionPoliciesString]: policies = [] } = {} } = useQuery({
    queryKey: ['AccessControl', restrictionPoliciesString, endpoint],
    queryFn: () => ky.get(
      `${endpoint}/${restrictionPoliciesString}`,
      kySearchOptions
    ).json(),
    ...queryOptions,
    enabled: queryOptions?.enabled !== false &&
      doAccessControl
  });

  // Also give an option flattening to list of policies with type injected... in the same shape as the policy claim list
  const flattenedPolicies = useMemo(() => {
    return policiesFlattener(policies);
  }, [policies]);

  return {
    policies,
    flattenedPolicies
  };
};

useRestrictionPolicies.propTypes = {
  doAccessControl: PropTypes.bool,
  endpoint: PropTypes.string.isRequired,
  restriction: PropTypes.oneOf(RESTRICTIONS).isRequired,
  queryOptions: PropTypes.object
};

export default useRestrictionPolicies;
