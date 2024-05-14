import { useMemo } from 'react';
import { useQueries } from 'react-query';
import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

const defaultParams = { page: 1 };

const useFetchCurrentAndNext = ({
  params = {},
  path = '',
  keyArray = [],
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
    queryKey: [
      path,
      ...currentPageParams,
      ...keyArray
    ],
    queryFn: () => ky.get(`${path}?${currentPageParams?.join('&')}`).json(),
  });

  const nextPageParams = useMemo(() => (
    generateKiwtQueryParams(
      { ...effectiveParams, page: effectiveParams.page + 1 },
      {}
    )
  ), [effectiveParams]);
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

export default useFetchCurrentAndNext;
