import { useMemo } from 'react';
import { useQueries } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

const useFetchWithNoStats = ({
  id,  // for future use / local zustand store
  params, // Need an initial value for page as to not cause issues when generating params
  path = '',
  keyArray = [],
} = {}) => {
  const ky = useOkapiKy();
  const queryArray = [];
  const currentPageParams = useMemo(() => (
    generateKiwtQueryParams(
      { ...params, stats: false },
      {}
    )
  ), [params]);
  queryArray.push({
    queryKey: [
      path,
      ...currentPageParams,
      ...keyArray
    ],
    queryFn: () => ky.get(`${path}?${currentPageParams?.join('&')}`).json(),
  });

  const nextPageParams = useMemo(() => (
    generateKiwtQueryParams(
      { ...params, page: params.page + 1, stats: false },
      {}
    )
  ), [params]);
  queryArray.push({
    queryKey: [
      path,
      ...nextPageParams,
      ...keyArray
    ],
    queryFn: () => ky.get(`${path}?${nextPageParams?.join('&')}`).json(),
  });

  const queries = useQueries(queryArray);

  return ({
    currentPage: queries[0],
    nextPage: queries[1],
  });
};

export default useFetchWithNoStats;
