
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueries, useQuery } from 'react-query';

import { chunk } from 'lodash';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

// A hook to do the same thing as batch fetching > 100 resources, but parallelising it.

// Only defining defaults to ward of "magic number" sonarlint rule -.-
const CONCURRENT_REQUESTS_DEFAULT = 5;
const MAX_BATCH_SIZE = 100;
const DEFAULT_BATCH_LIMIT = Infinity;

// CONCURRENT_REQUESTS and BATCH_SIZE can be tweaked here, but implementor beware
// They are formatted as if constants to discourage this
const useParallelBatchFetch = ({
  BATCH_LIMIT = DEFAULT_BATCH_LIMIT, // Number of resources to stop at, Infinity by default but can be set to a limit
  batchParams = {}, // Params object of the shape accepted by generateKiwtQueryParams
  BATCH_SIZE = MAX_BATCH_SIZE, // Number of resources to fetch per batch
  CONCURRENT_REQUESTS = CONCURRENT_REQUESTS_DEFAULT, // Number of requests to make concurrently
  endpoint, // endpoint to hit to fetch items
  generateQueryKey, // Passed function to allow customised query keys
  queryOptions: passedQueryOptions = {}, // Options to pass to each query
}) => {
  const ky = useOkapiKy();
  const SAFE_BATCH_SIZE = Math.min(BATCH_SIZE, MAX_BATCH_SIZE);
  const [isLoading, setIsLoading] = useState(true);

  // Destructure passed query options to grab enabled
  const { enabled: queryEnabled = true, ...queryOptions } = passedQueryOptions;

  const paramsArray = useMemo(() => (
    generateKiwtQueryParams(
      {
        ...batchParams,
        perPage: SAFE_BATCH_SIZE,
        stats: true
      },
      {}
    )
  ), [batchParams, SAFE_BATCH_SIZE]);

  const getDefaultNSArray = useCallback((offset) => ['ERM', endpoint, offset, paramsArray, 'useChunkedBatchedFetch'], [endpoint, paramsArray]);
  const namespaceArray = generateQueryKey ? generateQueryKey({
    CONCURRENT_REQUESTS,
    BATCH_LIMIT,
    SAFE_BATCH_SIZE,
    batchParams,
    endpoint,
    offset: 0,
    paramsArray,
    passedQueryOptions,
  }) : getDefaultNSArray(0);


  // Firstly fetch page 1 to get information about totals
  const firstFetchResult = useQuery(
    namespaceArray,
    () => ky.get(`${endpoint}?${[...paramsArray, 'offset=0']?.join('&')}`).json(),
    passedQueryOptions
  );

  // WAIT for initial fetch to conclude before setting up queryArray
  // Set up query array, and only enable the first CONCURRENT_REQUESTS requests
  const getQueryArray = useCallback(() => {
    if (!firstFetchResult?.isFetched) {
      return [];
    }

    const totalRecords = firstFetchResult?.data?.total ?? 0;
    const recordsToFetch = Math.min(totalRecords, BATCH_LIMIT);
    // Have already fetched page 1

    const queryArray = [];
    // Offset will be i * SAFE_BATCH_SIZE
    for (let offset = SAFE_BATCH_SIZE; offset < recordsToFetch; offset += SAFE_BATCH_SIZE) {
      const queryKey = generateQueryKey ? generateQueryKey({
        CONCURRENT_REQUESTS,
        BATCH_LIMIT,
        SAFE_BATCH_SIZE,
        batchParams,
        endpoint,
        offset,
        paramsArray,
        passedQueryOptions,
      }) : getDefaultNSArray(offset);

      const paramString = [...paramsArray, `offset=${offset}`]?.join('&');
      queryArray.push({
        queryKey,
        queryFn: () => ky.get(`${endpoint}?${paramString}`).json(),
        // Only enable once the previous slice has all been fetched
        enabled: queryEnabled && offset / SAFE_BATCH_SIZE < CONCURRENT_REQUESTS,
        ...queryOptions
      });
    }
    return queryArray;
  }, [
    firstFetchResult,
    BATCH_LIMIT,
    SAFE_BATCH_SIZE,
    generateQueryKey,
    CONCURRENT_REQUESTS,
    batchParams,
    endpoint,
    paramsArray,
    passedQueryOptions,
    getDefaultNSArray, queryEnabled, queryOptions, ky
  ]);

  // Differentiate between chunked logic and the first return (Which includes the initial fetch)
  const itemQueries = useQueries(getQueryArray());
  const returnItemQueries = useMemo(() => [firstFetchResult, ...itemQueries], [firstFetchResult, itemQueries]);

  // Once chunk has finished fetching, fetch next chunk
  useEffect(() => {
    const chunkedQuery = chunk(returnItemQueries, CONCURRENT_REQUESTS);
    chunkedQuery.forEach((q, i) => {
      // Check that all previous chunk are fetched,
      // and that all of our current chunk are not fetched and not loading
      if (
        i !== 0 &&
        chunkedQuery[i - 1]?.every(pq => pq.isFetched === true) &&
        q.every(req => req.isFetched === false) &&
        q.every(req => req.isLoading === false)
      ) {
        // Trigger fetch for each request in the chunk
        q.forEach(req => {
          req.refetch();
        });
      }
    });
  }, [CONCURRENT_REQUESTS, returnItemQueries]);

  // Keep easy track of whether this hook is all loaded or not
  // (This slightly flattens the "isLoading/isFetched" distinction, but it's an ease of use prop)
  useEffect(() => {
    const newLoading = ((itemQueries?.length ?? 0) < 1 || itemQueries?.some(uq => !uq.isFetched));

    if (isLoading !== newLoading) {
      setIsLoading(newLoading);
    }
  }, [isLoading, itemQueries]);

  return {
    itemQueries: returnItemQueries,
    isLoading,
    // Offer all fetched orderLines in flattened array once ready
    items: isLoading ? [] : returnItemQueries?.reduce((acc, curr) => {
      return [...acc, ...(curr?.data?.results ?? [])];
    }, []),
  };
};

export default useParallelBatchFetch;
