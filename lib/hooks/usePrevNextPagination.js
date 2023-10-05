import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import queryString from 'query-string';
import {
  DEFAULT_PAGINATION_SIZE,
  DEFAULT_PAGE_KEY,
  MCL_NEED_MORE_DATA_PREV_NEXT_ARG_INDEX,
  NEXT,
  PREV
} from '../constants';

import useLocalPageStore from './useLocalPageStore';

const usePrevNextPagination = ({
  count = 0, // Only needed for reading back MCL props
  defaultToPageOne = true, // A prop to allow the implementor to turn off the defaulting to page=1
  pageSize = DEFAULT_PAGINATION_SIZE, // Only needed for reading back MCL props
  id = DEFAULT_PAGE_KEY, // This id is ONLY used for syncToLocation: false cases, as a key to the zustand store
  syncToLocation = true // Used to turn on/off location syncing, so can be used as standalone state if required
} = {}) => {
  /* ------ ZUSTAND STORE ------ */
  // For NON-SYNC-TO-LOCATION use cases, store the currentPage in a keyed store
  const pageStore = useLocalPageStore(state => state.pageStore);
  const setPage = useLocalPageStore(state => state.setPage);

  /* ------ CURRENTPAGE STATE ------ */
  // Set up initialValue
  const getInitialCurrentPage = useCallback(() => {
    let initialCurrentPage;
    if (!syncToLocation) {
      if (pageStore[id]) {
        initialCurrentPage = pageStore[id];
      } else {
        // Initialise store state
        setPage(id, 1);
        initialCurrentPage = 1;
      }
    }

    return initialCurrentPage;
  }, [id, pageStore, setPage, syncToLocation]);
  // State itself
  const [currentPage, setCurrentPage] = useState(getInitialCurrentPage());

  const location = useLocation();
  const history = useHistory();

  /* ------ HANDLEPAGECHANGE ------ */
  // Takes in a direction "prev" or "next" and performs the requisite logic to move
  // currentPage state and/or zustand store state
  const handlePageChange = useCallback((direction) => {
    const urlQuery = queryString.parse(location.search);

    let newPage;
    if (direction === NEXT) {
      newPage = currentPage + 1;
    } else if (direction === PREV) {
      newPage = currentPage - 1;
    }

    if (!syncToLocation) {
      // We're manipulating the state directly in this case
      // We're dealing with the zustand store in this case,
      // change the store and the currentPage will update below
      setPage(id, newPage);
      setCurrentPage(newPage);
    } else if (newPage !== urlQuery?.page) {
      const newQuery = {
        ...urlQuery,
        page: newPage
      };
      history.push({
        pathname: location.pathname,
        search: `?${queryString.stringify(newQuery)}`
      });
    }
  }, [
    currentPage,
    history,
    id,
    location.pathname,
    location.search,
    setPage,
    syncToLocation
  ]);



  const [resetPageState, setResetPageState] = useState(false);
  const resetPage = useCallback(() => {
    if (syncToLocation) {
      setResetPageState(true);
    } else {
      setPage(id, 1);
      setCurrentPage(1);
    }
  }, [id, setPage, syncToLocation]);

  useEffect(() => {
    if (syncToLocation) {
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
    } else if (currentPage !== pageStore[id]) {
      // Only do this when not syncing to location...
      // If current page state is not what we have in the store, set current page state
      setCurrentPage(pageStore[id]);
    }
  }, [
    currentPage,
    defaultToPageOne,
    history,
    id,
    location,
    pageStore,
    resetPageState,
    syncToLocation
  ]);

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
      'search.submit'
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
