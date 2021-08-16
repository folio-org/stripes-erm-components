/* Used in scenarios where we want multiple refs need to be passed down as a ref to the dom element */

import { useCallback } from 'react';

function composeRefs(...refs) {
  return function composedCallbackRef(node) {
    for (const ref of refs) {
      if (typeof ref === 'function') { // ref can be a callback
        ref(node);
      } else if (ref != null) {
        ref.current = node;
      }
    }
  };
}

function useComposedRefs(...refs) {
  return useCallback(composeRefs(...refs), refs);
}

export default useComposedRefs;
