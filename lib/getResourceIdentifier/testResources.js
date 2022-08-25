const eresourceOne = {
  'id': '1a74d9e5-9d1c-4f47-a6c4-e5067b087ed3',
  'subType': {
    'id': '2c9180b07f436083017f43630f6b000c',
    'value': 'electronic',
    'label': 'Electronic'
  },
  'dateCreated': '2022-03-01T03:09:03Z',
  'tags': [],
  'lastUpdated': '2022-03-01T03:09:04Z',
  'normalizedName': '3 biotech',
  'publicationType': {
    'id': '2c9180b07f436083017f4363278f005a',
    'value': 'journal',
    'label': 'Journal'
  },
  'coverage': [
    {
      'id': '947bfcaa-34ae-4a2c-ac8f-9181a6c46d64',
      'startDate': '2011-01-01',
      'summary': 'v*/i*/2011-01-01 - v*/i*/*'
    }
  ],
  'name': '3 Biotech',
  'type': {
    'id': '2c9180b07f436083017f43630f94000f',
    'value': 'serial',
    'label': 'Serial'
  },
  'suppressFromDiscovery': false,
  'work': {
    'id': '2d4df6a4-be64-45d4-9af9-d61af7037a64'
  },
  'class': 'org.olf.kb.TitleInstance',
  'longName': '3 Biotech',
  'identifiers': [
    {
      'dateCreated': '2022-03-01T03:09:03Z',
      'lastUpdated': '2022-03-01T03:09:03Z',
      'status': {
        'id': '2c9180b07f436083017f43632855005c',
        'value': 'approved',
        'label': 'approved'
      },
      'identifier': {
        'value': '2190-5738',
        'ns': {
          'value': 'issn'
        }
      }
    },
    {
      'dateCreated': '2022-03-01T03:09:03Z',
      'lastUpdated': '2022-03-01T03:09:03Z',
      'status': {
        'id': '2c9180b07f436083017f43632855005c',
        'value': 'approved',
        'label': 'approved'
      },
      'identifier': {
        'value': '2600522-0',
        'ns': {
          'value': 'zdb'
        }
      }
    }
  ],
  'relatedTitles': [
    {
      'id': '35f6ec34-d423-4ab6-b158-b1769b62fefe',
      'subType': {
        'id': '2c9180b07f436083017f43630f63000b',
        'value': 'print',
        'label': 'Print'
      },
      'publicationType': {
        'id': '2c9180b07f436083017f4363278f005a',
        'value': 'journal',
        'label': 'Journal'
      },
      'name': '3 Biotech',
      'type': {
        'id': '2c9180b07f436083017f43630f94000f',
        'value': 'serial',
        'label': 'Serial'
      },
      'longName': '3 Biotech',
      'identifiers': [
        {
          'dateCreated': '2022-03-01T03:09:03Z',
          'lastUpdated': '2022-03-01T03:09:03Z',
          'status': {
            'id': '2c9180b07f436083017f43632855005c',
            'value': 'approved',
            'label': 'approved'
          },
          'identifier': {
            'value': '2190-572X',
            'ns': {
              'value': 'issn'
            }
          }
        }
      ]
    }
  ]
};

const eresourceTwo = {
  'id': '09164325-9b87-4f5c-9536-f81ab9c9e72e',
  'subType': {
    'id': '2c9180b07f436083017f43630f6b000c',
    'value': 'electronic',
    'label': 'Electronic'
  },
  'dateCreated': '2022-03-01T03:05:44Z',
  'tags': [],
  'lastUpdated': '2022-03-01T03:05:44Z',
  'normalizedName': 'a biographical dictionary of dissenting economists',
  'publicationType': {
    'id': '2c9180b07f436083017f4363a1ad005d',
    'value': 'book',
    'label': 'Book'
  },
  'coverage': [],
  'name': 'A biographical dictionary of dissenting economists',
  'type': {
    'id': '2c9180b07f436083017f43630f83000e',
    'value': 'monograph',
    'label': 'Monograph'
  },
  'suppressFromDiscovery': false,
  'work': {
    'id': 'c68472de-33e8-4f30-84e5-b8c5d2231c2f'
  },
  'class': 'org.olf.kb.TitleInstance',
  'longName': 'A biographical dictionary of dissenting economists',
  'identifiers': [
    {
      'dateCreated': '2022-03-01T03:05:44Z',
      'lastUpdated': '2022-03-01T03:05:44Z',
      'status': {
        'id': '2c9180b07f436083017f43632855005c',
        'value': 'approved',
        'label': 'approved'
      },
      'identifier': {
        'value': '9781843761396',
        'ns': {
          'value': 'isbn'
        },
      }
    },
    {
      'dateCreated': '2022-03-01T03:05:44Z',
      'lastUpdated': '2022-03-01T03:05:44Z',
      'status': {
        'id': '2c9180b07f436083017f43632855005c',
        'value': 'approved',
        'label': 'approved'
      },
      'identifier': {
        'value': '9781843761397',
        'ns': {
          'value': 'isbn'
        },
      }
    }
  ],
  'relatedTitles': []
};

const typeOne = 'issn';
const typeTwo = 'isbn';
export { eresourceOne, eresourceTwo, typeOne, typeTwo };
