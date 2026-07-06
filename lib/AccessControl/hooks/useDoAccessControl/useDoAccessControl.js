import { useMemo } from 'react';

import useEnabledEngines from '../useEnabledEngines';
import { ACQUISITION_UNIT_POLICY_TYPE } from '../../constants';

const useDoAccessControl = ({
  endpoint // The BASE endpoint for accessControl, such as erm/accessControl for mod-agreements :)
} = {}) => {
  // It is up to the BACKEND to check whether the various interfaces etc are present,
  // and to enrich with their information
  const enabledEnginesQuery = useEnabledEngines({ endpoint });
  const { enabledEngines, isLoading: isDoAccessControlLoading } = enabledEnginesQuery;
  const doAccessControl = useMemo(() => enabledEngines?.[ACQUISITION_UNIT_POLICY_TYPE] ?? false, [enabledEngines]); // For now, we only need to check acquisition units

  return { doAccessControl, isDoAccessControlLoading, enabledEnginesQuery };
};

export default useDoAccessControl;
