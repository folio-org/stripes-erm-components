import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';
import {
  DEFAULT_PAGINATION_SIZE,
  MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX,
  NEXT,
  PREV
} from '../constants';

const usePrevNextPagination = ({
  count = 0, // Only needed for reading back MCL props
  defaultToPageOne = true, // A prop to allow the implementor to turn off the defaulting to page=1
  pageSize = DEFAULT_PAGINATION_SIZE, // Only needed for reading back MCL props
} = {}) => {
  const [currentPage, setCurrentPage] = useState(undefined);
  const location = useLocation();
  const history = useHistory();

  const handlePageChange = useCallback((direction) => {
    const urlQuery = queryString.parse(location.search);

    let newPage;
    if (direction === NEXT) {
      newPage = currentPage + 1;
    } else if (direction === PREV) {
      newPage = currentPage - 1;
    }

    if (newPage !== urlQuery?.page) {
      const newQuery = {
        ...urlQuery,
        page: newPage
      };
      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(newQuery)}`
      });
    }
  }, [currentPage, history, location]);

  const [resetPageState, setResetPageState] = useState(false);

  const resetPage = useCallback(() => {
    setResetPageState(true);
  }, []);

  useEffect(() => {
    const urlQuery = queryString.parse(location.search);

    if (urlQuery?.page && currentPage !== urlQuery?.page) {
      setCurrentPage(Number(urlQuery?.page));
    } else if (!urlQuery?.page && defaultToPageOne) {
      // If url query "page" is not yet set, set it to 1
      setCurrentPage(1);
      const newQuery = {
        ...urlQuery,
        page: 1
      };

      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(newQuery)}`
      });
    }

    if (resetPageState) {
      const newQuery = {
        ...urlQuery,
        page: 1
      };

      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(newQuery)}`
      });
      setResetPageState(false);
    }
  }, [currentPage, defaultToPageOne, history, location, resetPageState]);

  // Set up MCL specific props based on page
  const pagingCanGoNext = currentPage && currentPage < Number(count) / pageSize;
  const pagingCanGoPrevious = currentPage && Number(currentPage) > 1;
  const pagingOffset = (currentPage - 1) * pageSize;
  const onNeedMoreData = (...args) => {
    if (args[MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX]) {
      handlePageChange(args[MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX]);
    }
  };

  // Set up SASQ callback handling
  // If extras are needed, these can be set up
  // manually using resetPage per SASQ
  const queryStateReducer = useCallback((_currState, nextState) => {
    const resetPageEvents = [
      'clear.all',
      'reset.all',
      'filter.state',
      'filter.clearGroup',
      'sort.change',
      'search.reset',
      'search.submit',
      'all.submit'
    ];

    if (resetPageEvents.includes(nextState.changeType)) {
      resetPage();
    }

    return nextState;
  }, [resetPage]);

  const paginationSASQProps = useMemo(() => ({
    queryStateReducer
  }), [queryStateReducer]);

  return ({
    currentPage,
    handlePageChange,
    paginationMCLProps: {
      onNeedMoreData,
      pagingCanGoNext,
      pagingCanGoPrevious,
      pagingOffset,
      pagingType: 'prev-next'
    },
    paginationSASQProps,
    queryStateReducer,
    resetPage,
  });
};

export default usePrevNextPagination;
