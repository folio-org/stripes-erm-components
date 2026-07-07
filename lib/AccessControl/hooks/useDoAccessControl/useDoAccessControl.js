import { useMemo } from 'react';

import useEnabledEngines from '../useEnabledEngines';

const useDoAccessControl = ({
  endpoint // The BASE endpoint for accessControl, such as erm/accessControl for mod-agreements :)
} = {}) => {
  // It is up to the BACKEND to check whether the various interfaces etc are present,
  // and to enrich with their information
  const enabledEnginesQuery = useEnabledEngines({ endpoint });
  const { enabledEngines, isLoading: isDoAccessControlLoading } = enabledEnginesQuery;
  const doAccessControl = useMemo(
    () => Object.values(enabledEngines ?? {}).some(Boolean),
    [enabledEngines]
  );

  return { doAccessControl, isDoAccessControlLoading, enabledEnginesQuery };
};

export default useDoAccessControl;
