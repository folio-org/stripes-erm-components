import { useQuery } from 'react-query';

import { parseErrorResponse } from '@k-int/stripes-kint-components';
import { useOkapiKy, useStripes } from '@folio/stripes/core';

import { INTERFACE_CREDENTIALS_ENDPOINT } from '../constants';

const useInterfaceCredentials = ({
  id,
  returnQueryObject = false
}) => {
  const endpoint = INTERFACE_CREDENTIALS_ENDPOINT(id);
  const ky = useOkapiKy();
  const stripes = useStripes();

  const queryObject = useQuery(
    ['ERM', 'InterfaceCredentials', id],
    () => ky.get(endpoint).json()
      .catch(async ({ response: err }) => {
        const error = await parseErrorResponse(err);
        if (error.code === 404 || error.code === '404') {
          // This is what's returned when an interface has no credentials...
          // Just ignore it
        } else {
          // eslint-disable-next-line no-console
          console.error('Something went wrong: %o', error);
        }
      }),
    {
      enabled: (
        !!id &&
        stripes.hasPerm('organizations-storage.interfaces.credentials.item.get') &&
        !!stripes.hasInterface('organizations-storage.interfaces', '1.0 2.0')
      )
    }
  );

  if (returnQueryObject) {
    return queryObject;
  }

  return queryObject?.data;
};

export default useInterfaceCredentials;
