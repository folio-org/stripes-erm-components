import { useEffect, useState } from 'react';
import useInterfaceCredentials from './useInterfaceCredentials';

/* By default, we often want to hide all the credentials,
 * and then only actually fetch those we want to display at any given time,
 * to keep as many of the credentials out of state as possible.
 *
 * This hook will only fetch a single set of credentials at a time, and store those in an array
 */

// WIP... do not use yet
const useSingleFetchInterfaceCredentials = () => {
  const [storedInterfaceCredentials, setStoredInterfaceCredentials] = useState({});
  const [fetchCredentialsId, setFetchCredentialsId] = useState();

  const interfaceCredentials = useInterfaceCredentials({
    id: fetchCredentialsId
  });

  // Any time we've fetched a new credentials, store it against the
  useEffect(() => {
    if (interfaceCredentials?.id && !!storedInterfaceCredentials[interfaceCredentials?.id]) {
      setStoredInterfaceCredentials({
        ...storedInterfaceCredentials,
        [interfaceCredentials?.id]: interfaceCredentials
      });
    }
  }, [interfaceCredentials, storedInterfaceCredentials]);
};

export default useSingleFetchInterfaceCredentials;

