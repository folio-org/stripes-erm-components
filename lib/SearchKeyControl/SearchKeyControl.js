import { useCallback, useEffect, useMemo, useState } from 'react';
import isEqual from 'lodash/isEqual';

import { useQIndex } from '@k-int/stripes-kint-components';
import { Checkbox } from '@folio/stripes/components';

import renderDynamicRows from '../renderDynamicRows';

/*
  IMPORTANT -- This component is controlled by the qIndex, rather than the other way around.
  It should inject values in/remove values from the qIndex, but not replace the entire thing.
*/
const SearchKeyControl = ({
  options = []
}) => {
  // This component expects a qIndex comprising of a comma separated list
  const [qIndex, setQIndex] = useQIndex();
  const qIndexArray = useMemo(() => qIndex?.split(',')?.map(index => index.trim()) ?? [], [qIndex]);

  // Memoise this process so keyState changes if and only if options/qIndex change
  const createKeyState = useCallback(() => (
    options.reduce((acc, curr) => {
      acc[curr.key] = { inUse: qIndexArray?.includes(curr.key), label: curr.label ?? curr.key };
      return acc;
    }, {})
  ), [options, qIndexArray]);

  const [keyState, setKeyState] = useState(createKeyState());

  // Keep keyState up to date as options/qIndex change
  useEffect(() => {
    const newKeyState = createKeyState();
    if (!isEqual(newKeyState, keyState)) {
      setKeyState(newKeyState);
    }
  }, [createKeyState, keyState]);


  return (
    renderDynamicRows(
      Object.entries(keyState),
      ([key, value]) => {
        /* At this point we have "key" corresponding to a searchKey option,
         * and "value" an object of the shape
          {
            inUse: a bool determining if it is in use or not,
            label: the label to display on the checkbox
          }
         */
        return (
          <Checkbox
            checked={value?.inUse}
            label={value?.label}
            onChange={e => {
              // If false, we must remove from the qIndex
              if (!e.target.checked) {
                const indexOfKey = qIndexArray.indexOf(key);
                if (indexOfKey > -1) { // only splice array when item is found
                  qIndexArray.splice(indexOfKey, 1); // 2nd parameter means remove one item only
                }
              } else {
                // If true, we need to add to qIndex
                qIndexArray.push(key);
              }

              setQIndex(qIndexArray?.join(','));
            }}
          />
        );
      },
      false
    )
  );
};

export default SearchKeyControl;
