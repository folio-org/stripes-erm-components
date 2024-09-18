import { useMemo } from 'react';
import { useQueries } from 'react-query';

import { useOkapiKy } from '@folio/stripes/core';
import { generateKiwtQueryParams } from '@k-int/stripes-kint-components';

const useFetchMultiplePages = ({
  getQueryKey = ({ params, pathStr, pageNum }) => [pathStr, pageNum, params],
  getQueryOptions = () => { return {}; }, // Returns queryOptions for react-query
  nsValues = {}, // Accepts an object of the shape expected by the second parameter of generateKiwtQueryParams
  pages, // If passed, this should be an array of the pages to be fetched. If NOT passed, it is assumed that the implementor will want "current" and "next"
  page, // If "pages" is passed, this is ignored. Otherwise, this takes precedence over whatever page parameter exists in params.
  params = {}, // Accepts an object of the shape expected by the first parameter of generateKiwtQueryParams
  path = '',
  // At some point in the future I'd like this to be able to accept a list of pages, and run those all in parallel (possibly with some chunking logic)
} = {}) => {
  const ky = useOkapiKy();
  const pageFetchArray = useMemo(() => {
    const array = [];
    if (pages) {
      array.push(...pages);
    } else if (!pages && page) {
      array.push(page);
      array.push(page + 1);
    } else if (params.page) {
      array.push(params.page);
      array.push(params.page + 1);
    } else {
      array.push(1);
      array.push(2);
    }

    return array;
  }, [page, pages, params.page]);

  // From this point forward we have a list of pages to fetch.
  const queryArray = useMemo(() => pageFetchArray.map(p => {
    const pageParams = generateKiwtQueryParams(
      { ...params, page: p },
      nsValues
    );

    return {
      queryKey: getQueryKey({
        params: pageParams,
        pageNum: p,
        pathStr: path
      }),
      queryFn: () => ky.get(`${path}?${pageParams?.join('&')}`).json(),
      ...getQueryOptions({
        params: pageParams,
        pageNum: p,
        pathStr: path
      })
    };
  }), [getQueryKey, getQueryOptions, ky, nsValues, pageFetchArray, params, path]);

  // Chunking these is a lot more difficult than doing it plain, since useQueries will already handle the +1 or -1
  // case for us and only fire the new query, but if we take it into our own hands it's difficult to not have it fire every time
  const queries = useQueries(queryArray);

  const returnEntries = pageFetchArray.map((p, i) => {
    return [p, queries[i]];
  });

  return Object.fromEntries(returnEntries);
};

export default useFetchMultiplePages;
