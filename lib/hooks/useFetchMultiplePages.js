import { useMemo } from 'react';
import { useQueries } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

const defaultParams = { page: 1 };

const useFetchMultiplePages = ({
  getQueryKey = ({ params, pathStr, pageNum }) => [pathStr, pageNum, params],
  params = {}, // Accepts an object of the shape expected by the first parameter of generateKiwtQueryParams
  path = '',
  // At some point in the future I'd like this to be able to accept a list of pages, and run those all in parallel (possibly with some chunking logic)
} = {}) => {
  const ky = useOkapiKy();
  const queryArray = [];

  // Apply defaultParams ensuring that 'page' is defaulted properly
  const effectiveParams = useMemo(() => ({ ...defaultParams, ...params }), [params]);

  const currentPageParams = useMemo(() => (
    generateKiwtQueryParams(
      { ...effectiveParams },
      {}
    )
  ), [effectiveParams]);
  queryArray.push({
    queryKey: getQueryKey({
      params: currentPageParams,
      pageNum: effectiveParams.page,
      pathStr: path
    }),
    queryFn: () => ky.get(`${path}?${currentPageParams?.join('&')}`).json(),
  });

  const nextPageParams = useMemo(() => (
    generateKiwtQueryParams(
      { ...effectiveParams, page: effectiveParams.page + 1 },
      {}
    )
  ), [effectiveParams]);
  queryArray.push({
    queryKey: getQueryKey({
      params: nextPageParams,
      pageNum: effectiveParams.page + 1,
      pathStr: path
    }),
    queryFn: () => ky.get(`${path}?${nextPageParams?.join('&')}`).json(),
  });

  const queries = useQueries(queryArray);

  return ({
    [effectiveParams.page]: queries[0],
    [effectiveParams.page + 1]: queries[1], // For now this is just "current" and "next", but longer term this could be expanded to n pages from a list for prefetching etc
  });
};

export default useFetchMultiplePages;
