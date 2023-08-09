import { useChunkedCQLFetch } from '@folio/stripes/core';

// When fetching from a potentially large list of users,
// make sure to chunk the request to avoid hitting limits.
const useChunkedUsers = (userIds, queryOptions = {}) => {
  const {
    itemQueries: userQueries,
    isLoading,
    items: users
  } = useChunkedCQLFetch({
    ids: userIds,
    endpoint: 'users',
    generateQueryKey: ({ chunkedItem, endpoint }) => (['ERM', endpoint, chunkedItem]),
    reduceFunction: (uq) => (
      uq.reduce((acc, curr) => {
        return [...acc, ...(curr?.data?.users ?? [])];
      }, [])
    ),
    queryOptions,
  });

  return {
    userQueries,
    isLoading,
    users
  };
};

export default useChunkedUsers;
