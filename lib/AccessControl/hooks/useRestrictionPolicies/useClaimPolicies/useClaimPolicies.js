import useRestrictionPolicies from '../useRestrictionPolicies';
import { CLAIM } from '../../../constants';

// Refactored to use generic useRestrictionPolicies and keep backwards compatibility.
const useClaimPolicies = ({
  ...useRestrictionPoliciesProps
}) => {
  const { policies: claimPolicies, flattenedPolicies: flattenedClaimPolicies } = useRestrictionPolicies({
    ...useRestrictionPoliciesProps,
    restriction: CLAIM,
  });

  return {
    claimPolicies,
    flattenedClaimPolicies
  };
};

export default useClaimPolicies;
