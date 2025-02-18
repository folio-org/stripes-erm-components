import { usePrevNextPagination as usePrevNextPaginationFromKintComps } from '@k-int/stripes-kint-components';

let hasWarned = false;

const usePrevNextPagination = (props) => {
  if (!hasWarned) {
    // eslint-disable-next-line no-console
    console.warn('deprecated, use directly from kint-comps');
    hasWarned = true;
  }
  return usePrevNextPaginationFromKintComps(props);
};

export default usePrevNextPagination;
