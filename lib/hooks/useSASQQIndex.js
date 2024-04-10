import { useCallback, useMemo } from 'react';

import { useQIndex } from '@k-int/stripes-kint-components';

// A helper hook to take the raw functionality of useQIndex and provide all
// the props etc needed to utilise that within SASQ (and generateKiwtQueryParams)
const useSASQQIndex = ({
  defaultQIndex = '',
  /*
   * defaultQuery is mainly here so we can avoid extra boilerplate fiddling
   * if we want a default query at some point
   */
  defaultQuery = '',
  /*
   * In some circumstances you may wish the searchKey to _not_ be
   * equivalent to the defaultQIndex when no qIndex exists in the url,
   * such as when the defaultQindex is a subset of the options available
   * to the user in a SearchKeyControl. In that case deselecting all options
   * is assumed to be equivalent to selecting all options.
   */
  defaultSearchKey = '',
} = {}) => {
  const [qIndex, setQIndex] = useQIndex();

  const qIndexChanged = useMemo(() => qIndex !== defaultQIndex, [defaultQIndex, qIndex]);

  // Ensure all the building blocks are available as exports
  const initialSearchState = useMemo(() => ({ query: defaultQuery, qindex: defaultQIndex }), [defaultQIndex, defaultQuery]);
  const qindexSearchParamsMapping = useCallback((v) => ({ qindex: v }), []);
  const querySearchParamsMapping = useCallback((v) => ({ query: v }), []);

  const searchParamsMapping = useMemo(() => ({
    query: querySearchParamsMapping,
    qindex: qindexSearchParamsMapping
  }), [qindexSearchParamsMapping, querySearchParamsMapping]);

  const qIndexSASQProps = {
    retainInternalSearchState: true,
    initialSearchState,
    /*
      Not entirely happy with the fact this boilerplate
      needs to be here for qIndex to work as expected.
      See https://folio-project.slack.com/archives/C210UCHQ9/p1659014709252189
    */
    searchParamsMapping
  };

  const searchKey = useMemo(() => {
    if (!!qIndex && qIndex !== '') {
      return qIndex;
    }

    if (!!defaultSearchKey && defaultSearchKey !== '') {
      return defaultSearchKey;
    }

    return defaultQIndex;
  }, [defaultQIndex, defaultSearchKey, qIndex]);

  return {
    initialSearchState,
    qIndex,
    qIndexChanged,
    qIndexSASQProps,
    qindexSearchParamsMapping,
    querySearchParamsMapping,
    searchKey,
    searchParamsMapping,
    setQIndex
  };
};

export default useSASQQIndex;

