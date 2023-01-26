import useChunkedCQLFetch from './useChunkedCQLFetch';

// When fetching from a potentially large list of users,
// make sure to chunk the request to avoid hitting limits.
const useChunkedUsers = (userIds) => {
  const {
    itemQueries: userQueries,
    isLoading,
    items: users
  } = useChunkedCQLFetch({
    ids: userIds,
    endpoint: 'users',
    reduceFunction: (uq) => (
      uq.reduce((acc, curr) => {
        return [...acc, ...(curr?.data?.users ?? [])];
      }, [])
    )
  });

  return {
    userQueries,
    isLoading,
    users
  };
};

export default useChunkedUsers;
