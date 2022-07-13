const internalContactSelection = {
  'id': 'agreement-internal-contacts-filter',
  'input': {
    'name': 'agreement-contacts-filter',
    'onChange': () => {},
    'value': ''
  },
  'path': 'erm/contacts',
  'stripes': {
    'logger': '{categories: "core,action,xhr", prefix: "stripes", …}',
    'store': '{@@observable: ƒ observable() {}, dispatch: ƒ () {}…}',
    'epics': '{add: ƒ add() {}, middleware: ƒ epicMiddleware() {}…}',
    'config': '{}',
    'okapi': '{bindings: {…}, currentPerms: {…}, currentUser: {…}…}',
    'withOkapi': true,
    'setToken': 'ƒ setToken() {}',
    'actionNames': '["selectPreviousRow", "selectNextRow", "selectFirst…]',
    'locale': 'en-US',
    'timezone': 'UTC',
    'currency': 'USD',
    'metadata': '{agreements: {…}, dashboard: {…}, eholdings: {…}, e…}',
    'icons': '{@folio/agreements: {…}, @folio/dashboard: {…}, @fo…}',
    'setLocale': 'ƒ setLocale() {}',
    'setTimezone': 'ƒ setTimezone() {}',
    'setCurrency': 'ƒ setCurrency() {}',
    'plugins': '{}',
    'setSinglePlugin': 'ƒ setSinglePlugin() {}',
    'bindings': '{}',
    'setBindings': 'ƒ setBindings() {}',
    'discovery': '{interfaceProviders: Array(68), interfaces: {…}, is…}',
    'user': '{perms: {…}, user: {…}}',
    'connect': 'ƒ () {}'
  }
};

const internalContactSelectionContainer = {
  'id': 'agreement-internal-contacts-filter',
  'input': {
    'name': 'agreement-contacts-filter',
    'onChange': () => {},
    'value': ''
  },
  'path': 'erm/contacts',
  'dataKey': 'agreement-contacts-filter',
  'resources': {
    'contacts': {
      'hasLoaded': true,
      'isPending': false,
      'failed': false,
      'records': [{
        'id': 'fa2a7ca7-b6b6-4194-ad2e-ceafa2bdf938',
        'owner': {
          'id': '6101a5a4-9a57-40b2-855e-750dda7db5f3'
        },
        'role': {
          'id': '2c91809c81a566020181a56cf8eb002c',
          'value': 'erm_librarian',
          'label': 'ERM librarian'
        },
        'user': '31a64f45-dc6d-45a8-aad6-f0ba161238b8'
      }],
      'successfulMutations': [],
      'failedMutations': [],
      'pendingMutations': [],
      'loadedAt': 'Tue Jun 28 2022 09:16:48 GMT+0100 (British Summer Time)',
      'url': 'https://folio-snapshot-2-okapi.dev.folio.org/erm/contacts?perPage=100&stats=true',
      'headers': 'Headers(undefined) {"content-type" => "application/json;charset=UTF-8"}',
      'httpStatus': 200,
      'other': {
        'pageSize': 100,
        'page': 1,
        'totalPages': 1,
        'meta': '{}',
        'totalRecords': 1,
        'total': 1
      },
      'resource': 'contacts',
      'module': '@folio/agreements',
      'dataKey': 'agreement-contacts-filter',
      'throwErrors': true
    },
    'users': {
      'hasLoaded': false,
      'isPending': false,
      'failed': false,
      'records': [],
      'successfulMutations': [],
      'failedMutations': [],
      'pendingMutations': []
    },
    'totalContactsCount': 100
  },
  'okapi': {
    'url': 'https://folio-snapshot-2-okapi.dev.folio.org',
    'tenant': 'diku',
    'locale': 'en-US',
    'currentUser': {
      'id': '934912f4-af6b-5274-aa25-7459a0fe4733',
      'username': 'diku_admin',
      'lastName': 'ADMINISTRATOR',
      'firstName': 'DIKU',
      'email': 'admin@diku.example.org',
      'addresses': [],
      'servicePoints': [{
        'id': 'c4c90014-c8c9-4ade-8f24-b5e313319f4b',
        'name': 'Circ Desk 2',
        'code': 'cd2',
        'discoveryDisplayName': 'Circulation Desk -- Back Entrance',
        'pickupLocation': true,
        'staffSlips': [],
        'locationIds': [],
        'metadata': {
          'createdDate': '2022-06-27T13:48:47.351+00:00',
          'updatedDate': '2022-06-27T13:48:47.351+00:00'
        },
        'holdShelfExpiryPeriod': {
          'duration': 5,
          'intervalId': 'Days'
        }
      },
      {
        'id': '3a40852d-49fd-4df2-a1f9-6e2641a6e91f',
        'name': 'Circ Desk 1',
        'code': 'cd1',
        'discoveryDisplayName': 'Circulation Desk -- Hallway',
        'pickupLocation': true,
        'staffSlips': [],
        'locationIds': [],
        'metadata': {
          'createdDate': '2022-06-27T13:48:47.352+00:00',
          'updatedDate': '2022-06-27T13:48:47.352+00:00'
        },
        'holdShelfExpiryPeriod': {
          'duration': 3,
          'intervalId': 'Weeks'
        }
      },
      {
        'id': '7c5abc9f-f3d7-4856-b8d7-6712462ca007',
        'name': 'Online',
        'code': 'Online',
        'discoveryDisplayName': 'Online',
        'shelvingLagTime': 0,
        'pickupLocation': false,
        'staffSlips': [],
        'locationIds': [],
        'metadata': {
          'createdDate': '2022-06-27T13:48:47.344+00:00',
          'updatedDate': '2022-06-27T13:48:47.344+00:00'
        }
      }
      ],
      'curServicePoint': {
        'id': 'c4c90014-c8c9-4ade-8f24-b5e313319f4b',
        'name': 'Circ Desk 2',
        'code': 'cd2',
        'discoveryDisplayName': 'Circulation Desk -- Back Entrance',
        'pickupLocation': true,
        'staffSlips': '[]',
        'locationIds': '[]',
        'metadata': {
          'createdDate': '2022-06-27T13:48:47.351+00:00',
          'updatedDate': '2022-06-27T13:48:47.351+00:00'
        },
        'holdShelfExpiryPeriod': {
          'duration': 5,
          'intervalId': 'Days'
        }
      }
    },
    'ssoEnabled': false,
    'okapiReady': true,
    'authFailure': '[]',
    'bindings': '{}',
    'plugins': '{}'
  },
  'mutator': {
    'contacts': {
      'DELETE': 'ƒ DELETE() {}',
      'PUT': 'ƒ PUT() {}',
      'POST': 'ƒ POST() {}',
      'cancel': 'ƒ cancel() {}'
    },
    'users': {
      'DELETE': 'ƒ DELETE() {}',
      'PUT': 'ƒ PUT() {}',
      'POST': 'ƒ POST() {}',
      'cancel': 'ƒ cancel() {}'
    },
    'totalContactsCount': {
      'update': 'ƒ update() {}',
      'replace': () => {}
    }
  },
  'refreshRemote': 'ƒ () {}',
  'root': {
    'addReducer': 'ƒ () {}',
    'addEpic': 'ƒ () {}',
    'store': {
      'dispatch': 'ƒ () {}',
      'subscribe': 'ƒ subscribe() {}',
      'getState': 'ƒ getState() {}',
      'replaceReducer': 'ƒ replaceReducer() {}',
      '@@observable': 'ƒ observable() {}'
    }
  }
};

const internalContactSelectionDisplay = {
  'contacts': [{
    'value': '9a04ae0d-e39f-44c3-b520-43144f6d93e4',
    'label': 'Becker, Kaylee Zola'
  },
  {
    'value': '875da4ae-11a7-419b-b02e-b3a825946539',
    'label': 'Admin, acq-manager '
  },
  {
    'value': '2075c729-a9b8-43db-860c-60a3cc31a949',
    'label': 'Davis, Jodie '
  },
  {
    'value': '31a64f45-dc6d-45a8-aad6-f0ba161238b8',
    'label': 'Admin, acq-admin '
  }
  ],
  'id': 'agreement-internal-contacts-filter',
  'loading': false,
  'onChange': () => {},
  'value': 'Agreement owner'
};


export {
  internalContactSelection,
  internalContactSelectionContainer,
  internalContactSelectionDisplay
};
