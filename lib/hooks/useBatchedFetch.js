import { useEffect, useMemo } from 'react';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';
import useInfiniteFetch from './useInfiniteFetch';

const MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_LIMIT = 1000;

const useBatchedFetch = ({
  batchParams = {},
  batchLimit = DEFAULT_BATCH_LIMIT,
  batchSize = MAX_BATCH_SIZE,
  nsArray, // An array to replace the default namespaceArray defined below
  path,
  queryParams
}) => {
  const ky = useOkapiKy();
  const safeBatchSize = Math.min(batchSize, MAX_BATCH_SIZE);

  const paramsArray = useMemo(() => (
    generateKiwtQueryParams(
      {
        ...batchParams,
        perPage: safeBatchSize
      },
      {}
    )
  ), [batchParams, safeBatchSize]);

  const namespaceArray = nsArray ?? [path, paramsArray, 'stripes-erm-components', 'useBatchedFetch'];

  const {
    infiniteQueryObject: {
      fetchNextPage,
      data: { pageParams } = {},
      ...rest
    },
    results = [],
    total = 0
  } = useInfiniteFetch(
    namespaceArray,
    ({ pageParam = 0 }) => {
      const params = [...paramsArray, `offset=${pageParam}`];
      return ky.get(`${path}?${params?.join('&')}`).json();
    },
    queryParams
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
