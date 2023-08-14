import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';
import { pagination } from '../constants';

// THIS SHOULD BE SET BY CALLING CODE, ONLY DEFAULTED TO AVOID DIVISION BY UNDEFINED
const DEFAULT_PAGINATION_SIZE = 25;

// Only here because we need argument 3 from onNeedMoreData
// and want to avoid "magic number" sonarlint
const MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX = 3;

const usePrevNextPagination = ({
  count = 0, // Only needed for reading back MCL props
  pageSize = DEFAULT_PAGINATION_SIZE, // Only needed for reading back MCL props
} = {}) => {
  const [currentPage, setCurrentPage] = useState(undefined);
  const location = useLocation();
  const history = useHistory();

  const handlePageChange = (direction) => {
    const urlQuery = queryString.parse(location.search);

    let newPage;
    if (direction === pagination.NEXT) {
      newPage = currentPage + 1;
    } else if (direction === pagination.PREV) {
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
  };

  const [resetPageState, setResetPageState] = useState(false);
  const resetPage = () => {
    setResetPageState(true);
  };

  /* As things stand, we cannot synchronously set location in a
   * call which is used within SASQ, because the querySetter itself
   * makes changes to location. This is a workaround, but seems like
   * the most expedient and least evil solution.
   * Possible solution could be moving the locationQuerySetter out of the
   * querySetter, but that might/will break this approach and potentially
   * useQindex as well
   */
  /* const resetPage = () => {
    const urlQuery = queryString.parse(location.search);

    const newQuery = {
      ...urlQuery,
      page: 1
    };

    history.push({
      pathname: location.pathname,
      search: `?${queryString.stringify(newQuery)}`
    });
  }; */

  useEffect(() => {
    const urlQuery = queryString.parse(location.search);

    if (urlQuery?.page && currentPage !== urlQuery?.page) {
      setCurrentPage(Number(urlQuery?.page));
    } else if (!urlQuery?.page) {
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
  }, [currentPage, history, location, resetPageState]);

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
  const filterChangeCallback = () => resetPage();
  const searchChangeCallback = () => resetPage();
  const sortChangeCallback = () => resetPage();

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
    resetPage,
    searchAndSortPaginationProps: {
      filterChangeCallback,
      searchChangeCallback,
      sortChangeCallback
    }
  });
};

export default usePrevNextPagination;
