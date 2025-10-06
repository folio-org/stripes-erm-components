import { useCallback, useMemo, useState } from 'react';
import orderBy from 'lodash/orderBy';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';
const ASC = 'asc';
const DESC = 'desc';

// NOTE without using accessors, this can ONLY handle scalar sorts where all rows have the same Type for each sortOrder
const useMCLMemorySort = ({
  accessors = {}, // A map from column name -> access function taking in sortOrder
  data,
  ignoreCase = true,
  initialSort,
  initialSortDirection = ASCENDING,
}) => {
  const [sortOrder, setSortOrder] = useState(initialSort);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);

  const handleSort = useCallback((e, meta) => {
    if (meta.name === sortOrder) {
      setSortDirection(prev => (prev === ASCENDING ? DESCENDING : ASCENDING));
    } else {
      setSortOrder(meta.name);
      setSortDirection(ASCENDING);
    }
  }, [sortOrder]);

  const sortedData = useMemo(() => {
    return orderBy(
      data,
      [(row) => {
        if (accessors[sortOrder] && typeof accessors[sortOrder] === 'function') {
          return accessors[sortOrder](row, sortOrder);
        }

        if (ignoreCase && typeof row[sortOrder] === 'string') {
          return row[sortOrder].toLowerCase();
        }

        return row[sortOrder];
      }],
      sortDirection === ASCENDING ? ASC : DESC,
    );
  }, [data, sortDirection, accessors, sortOrder, ignoreCase]);

  return ({
    handleSort,
    sortedData,
    sortDirection,
    sortOrder,
  });
};

export default useMCLMemorySort;
