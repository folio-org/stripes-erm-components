import { useEffect, useMemo } from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';
import useInfiniteFetch from './useInfiniteFetch';

const MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_LIMIT = 1000;

const useBatchedFetch = ({
  batchParams = {},
  batchLimit = DEFAULT_BATCH_LIMIT,
  batchSize,
  path,
}) => {
  const ky = useOkapiKy();

  const paramsArray = useMemo(() => (
    generateKiwtQueryParams(
      {
        ...batchParams,
        perPage: batchSize
      },
      {}
    )
  ), [batchParams, batchSize]);

  const safeBatchSize = Math.min(batchSize, MAX_BATCH_SIZE);

  const {
    infiniteQueryObject: {
      fetchNextPage,
      data: { pageParams } = {},
      ...rest
    },
    results = [],
    total = 0
  } = useInfiniteFetch(
    [path, paramsArray, 'stripes-erm-components', 'useBatchedFetch'],
    ({ pageParam = 0 }) => {
      const params = [...paramsArray, `offset=${pageParam}`];
      return ky.get(`${path}?${params?.join('&')}`).json();
    }
  );

  // Keep fetching them in chunks until we have all the values we require
  useEffect(() => {
    if (
      results?.length !== total &&
      results?.length < batchLimit
    ) {
      fetchNextPage({ pageParam: (pageParams[-1] ?? 0) + safeBatchSize });
    }
  });

  return {
    results,
    total,
    ...rest
  };
};

export default useBatchedFetch;
