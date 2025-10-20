import { useMemo } from 'react';
import { useQuery } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import PropTypes from 'prop-types';
import { getPoliciesFromRestriction, RESTRICTIONS } from '../../constants';

export const policiesFlattener = (inputPolicies) => {
  const policies = inputPolicies.flatMap(inputPol => inputPol.policies.map(policy => ({ policy, type: inputPol.type })));
  return policies.filter((policy, index, self) => index === self.findIndex(p => p.policy.id === policy.policy.id && p.type === policy.type));
};

const useRestrictionPolicies = ({
  endpoint, // This should be the base accessControl endpoint, such as erm/accessControl
  restriction, // This is a MANDATORY prop, CLAIM vs READ etc
  queryOptions
}) => {
  const ky = useOkapiKy();

  const restrictionPoliciesString = getPoliciesFromRestriction(restriction);
  const { data: { policies = [] } = {} } = useQuery(
    ['AccessControl', restrictionPoliciesString, endpoint],
    () => ky.get(`${endpoint}/${restrictionPoliciesString}`).json(),
    queryOptions
  );

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
  endpoint: PropTypes.string.isRequired,
  restriction: PropTypes.oneOf(RESTRICTIONS).isRequired,
  queryOptions: PropTypes.object
};

export default useRestrictionPolicies;
