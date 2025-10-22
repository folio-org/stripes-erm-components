import useRestrictionPolicies from '../useRestrictionPolicies';
import { CLAIM } from '../../../constants';

const useClaimPolicies = ({
  ...useRestrictionPoliciesProps
}) => {
  return useRestrictionPolicies({
    ...useRestrictionPoliciesProps,
    restriction: CLAIM,
  });
};

export default useClaimPolicies;
