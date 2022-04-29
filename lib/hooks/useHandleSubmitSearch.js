import { useRef, useState, useEffect, useCallback } from 'react';

export default (source) => {
  const [currentRecordsArePending, setCurrentRecordsArePending] = useState(true); //
  const [searchIsPending, setSearchIsPending] = useState(false);
  const prevRecordsArePending = useRef();
  const resultsPaneTitleRef = useRef();

  const isPending = source?.pending() ?? true;
  const hasResults = !!(source?.totalCount() ?? 0);

  const onSearchComplete = useCallback(() => {
    setSearchIsPending(false);
    // at this point results are back, so if there are any results, we focus onto the resultsPane
    if (hasResults && resultsPaneTitleRef.current) {
      resultsPaneTitleRef.current.focus();
    }
  }, [hasResults]);

  useEffect(() => {
    if (searchIsPending && prevRecordsArePending.current && !currentRecordsArePending) {
      onSearchComplete();
    }
    // ref.current points to the previous records pending state (equivalent to prevprops.source.pending())
    prevRecordsArePending.current = currentRecordsArePending;
    setCurrentRecordsArePending(isPending);
  }, [searchIsPending, isPending, currentRecordsArePending, onSearchComplete]);

  const handleSubmitSearch = (e, onSubmitSearch) => {
    setSearchIsPending(true);
    onSubmitSearch(e);
  };

  return { handleSubmitSearch, resultsPaneTitleRef };
};
