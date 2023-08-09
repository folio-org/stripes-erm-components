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
  const urlQuery = queryString.parse(location.search);

  const handlePageChange = (direction) => {
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

  const resetPage = () => {
    const newQuery = {
      ...urlQuery,
      page: undefined
    };

    history.push({
      pathname: location.pathname,
      search: `?${queryString.stringify(newQuery)}`
    });
  };

  useEffect(() => {
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
  }, [currentPage, history, location, urlQuery]);


  // Set up MCL specific props based on page
  const pagingCanGoNext = currentPage && currentPage < Number(count) / pageSize;
  const pagingCanGoPrevious = currentPage && Number(currentPage) > 1;
  const pagingOffset = (currentPage - 1) * pageSize;
  const onNeedMoreData = (...args) => {
    if (args[MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX]) {
      handlePageChange(args[MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX]);
    }
  };

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
    resetPage
  });
};

export default usePrevNextPagination;
