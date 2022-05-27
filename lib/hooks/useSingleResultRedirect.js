import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import usePrevious from './usePrevious';

const useSingleResultRedirect = (entityCount, entityId, redirectUrlCallback) => {
  const location = useLocation();
  const history = useHistory();

  const oldCount = usePrevious(entityCount);
  const oldId = usePrevious(entityId);

  useEffect(() => {
    if (
      entityCount === 1 &&
      (oldCount !== 1 || (oldCount === 1 && oldId !== entityId)) &&
      `${location.pathname}${location.search}` !== `${redirectUrlCallback(entityId)}${location.search}`
    ) {
      history.push(`${redirectUrlCallback(entityId)}${location.search}`);
    }
  }, [entityId, entityCount, history, location.pathname, location.search, oldCount, oldId, redirectUrlCallback]);
};

export default useSingleResultRedirect;
