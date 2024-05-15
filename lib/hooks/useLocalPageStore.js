import { create } from 'zustand';
import { DEFAULT_PAGE_KEY } from '../constants';

// Any time that usePrevNextPagination is NOT synced to location,
// store a keyed currentPage here instead
const useLocalPageStore = create(
  (set) => ({
    pageStore: {},
    setPage: (id, page) => set((state) => {
      // Any non-id keyed pages will go into a single storage slot
      const key = id ?? DEFAULT_PAGE_KEY;

      return { ...state, pageStore: { ...state.pageStore, [key]: page } };
    }),
  }),
);

export default useLocalPageStore;
