/* Used in scenarios where multiple refs need to be passed down as a ref to grab the underlying dom element
  eg: one of the refs could just be a forward ref (https://reactjs.org/docs/forwarding-refs.html)
  to be forwarded to the child component. The other ref could be created in the same component and wants to
  target the same dom element in the underlying child component, in that scenario, we can make use of this hook to compose both the refs.
*/

import { useCallback } from 'react';

function useComposedRefs(...refs) {
  return useCallback(() => {
    return (node) => {
      for (const ref of refs) {
        if (typeof ref === 'function') { // ref can be a callback
          ref(node);
        } else if (ref != null) {
          ref.current = node;
        }
      }
    };
  }, [refs]);
}

export default useComposedRefs;
