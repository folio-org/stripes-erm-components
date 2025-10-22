import useRestrictionPolicies from '../useRestrictionPolicies';
import { READ } from '../../../constants';

const useReadPolicies = ({
  ...useRestrictionPoliciesProps
}) => {
  return useRestrictionPolicies({
    ...useRestrictionPoliciesProps,
    restriction: READ,
  });
};

export default useReadPolicies;
