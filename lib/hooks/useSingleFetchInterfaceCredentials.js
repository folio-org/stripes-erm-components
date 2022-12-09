import { useEffect, useState } from 'react';
import useInterfaceCredentials from './useInterfaceCredentials';

/* By default, we often want to hide all the credentials,
 * and then only actually fetch those we want to display at any given time,
 * to keep as many of the credentials out of state as possible.
 *
 * This hook will only fetch a single set of credentials at a time, and store those in an object
 */

const useSingleFetchInterfaceCredentials = () => {
  const [storedInterfaceCredentials, setStoredInterfaceCredentials] = useState({});
  const [interfaceId, setInterfaceId] = useState();

  const interfaceCredentials = useInterfaceCredentials({
    id: interfaceId,
  });

  useEffect(() => {
    if (
      interfaceId &&
      interfaceCredentials?.id &&
      (
        !storedInterfaceCredentials[interfaceId] ||
        /*
         * This is in place to make sure that if interface credentials change, we can update them.
         * Since interfaceId changes first, we can be sure we won't overwrite an existing
         * interfaceCredentials with incorrect data. However there could in theory be a race condition
         * whereby the interfaceId has changed, but the query has not yet fired, leading to the old
         * interface data being injected into the new interfaceId key.
         *
         *
         * This is highly unlikely, and seemingly not happening, but the below condition ensures
         * that should it happen, once the new (correct) data has loaded, we can overwrite the
         * duff data with it.
         *
         * TLDR: The below condition might not be necessary, but it's safer to include it.
         */
        storedInterfaceCredentials[interfaceId]?.id !== interfaceCredentials?.id
      )
    ) {
      setStoredInterfaceCredentials({
        ...storedInterfaceCredentials,
        [interfaceId]: interfaceCredentials
      });
    }
  }, [
    interfaceCredentials,
    interfaceId,
    storedInterfaceCredentials
  ]);

  return {
    storedInterfaceCredentials,
    setInterfaceId
  };
};

export default useSingleFetchInterfaceCredentials;

