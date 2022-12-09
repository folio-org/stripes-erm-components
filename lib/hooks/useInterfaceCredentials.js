import { useQuery } from 'react-query';

import { useOkapiKy, useStripes } from '@folio/stripes/core';

import { INTERFACE_CREDENTIALS_ENDPOINT } from '../endpoints';

const useInterfaceCredentials = ({
  id,
  returnQueryObject = false
}) => {
  const endpoint = INTERFACE_CREDENTIALS_ENDPOINT(id);
  const ky = useOkapiKy();
  const stripes = useStripes();

  const queryObject = useQuery(
    ['ERM', 'InterfaceCredentials', id],
    () => ky.get(endpoint).json(),
    {
      enabled: (
        !!id &&
        stripes.hasPerm('organizations-storage.interfaces.credentials.item.get') &&
        !!stripes.hasInterface('organizations-storage.interfaces', '1.0 2.0')
      )
    }
  );

  console.log("QUERYObject: %o", queryObject);

  if (returnQueryObject) {
    return queryObject;
  }

  return queryObject?.data?.[0];
};

export default useInterfaceCredentials;


/*
manifest = Object.freeze({
  interfaces: {
    type: 'okapi',
    path: 'organizations-storage/interfaces',
    perRequest: RECORDS_PER_REQUEST,
    params: (_q, _p, _r, _l, props) => {
      const orgs = get(props.resources, 'license.records[0].orgs', []);
      const interfaces = flatten(orgs.map(o => get(o, 'org.orgsUuid_object.interfaces', [])));
      const query = [
        ...new Set(interfaces.map(i => `id==${i}`))
      ].join(' or ');

      return query ? { query } : {};
    },
    fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '2.0'),
    permissionsRequired: 'organizations-storage.interfaces.collection.get',
    records: 'interfaces',
  },
  interfacesCredentials: {
    clientGeneratePk: false,
    throwErrors: false,
    path: 'organizations-storage/interfaces/%{interfaceRecord.id}/credentials',
    type: 'okapi',
    pk: 'FAKE_PK',  // it's done to fool stripes-connect not to add cred id to the path's end.
    permissionsRequired: 'organizations-storage.interfaces.credentials.item.get',
    fetch: props => !!props.stripes.hasInterface('organizations-storage.interfaces', '1.0 2.0'),
  },
  interfaceRecord: {},
});


    const interfacesCredentials = uniqBy(get(resources, 'interfacesCredentials.records', []), 'id');

    if (interfacesCredentials[0]) {
      const index = credentialsArray.findIndex(object => object.id === interfacesCredentials[0].id);
      if (index === -1) {
        credentialsArray.push(interfacesCredentials[0]);
      }
    }

    const orgs = license.orgs?.map(o => ({
      ...o,
      interfaces: get(o, 'org.orgsUuid_object.interfaces', [])
        .map(id => ({
          ...getRecord(id, 'interfaces') || {},
          credentials: credentialsArray.find(cred => cred.interfaceId === id)
        })),
    }));

  const handleFetchCredentials = (id) => {
    mutator.interfaceRecord.replace({ id });
  };
*/