import { FormattedMessage } from 'react-intl';

const emptyFieldProps = {
  'input': {
    'name': 'orgs[0].org.orgsUuid',
    'value': '',
    'onBlur': jest.fn(),
    'onChange': jest.fn(),
    'onFocus': jest.fn()
  },
  'meta': {
    'active': false,
    'data': '{}',
    'dirty': false,
    'dirtySinceLastSubmit': false,
    'error': '<Memo />',
    'invalid': true,
    'modified': false,
    'modifiedSinceLastSubmit': false,
    'pristine': true,
    'submitFailed': false,
    'submitSucceeded': false,
    'submitting': false,
    'touched': false,
    'valid': false,
    'validating': false,
    'visited': false
  },
  'duplicateMessage': <FormattedMessage id="stripes-erm-components.organizations.duplicateOrgError" values={{ orgName: 'testOrg' }} />,
  'duplicateWarning': false,
  'headerEnd': 'Link organization',
  'headerStart': 'Organization',
  'id': 'orgs-0',
  'setDuplicateWarning': jest.fn(),
  'fetchCredentials': jest.fn()
};

const props = {
  'input': {
    'name': 'orgs[0].org.orgsUuid',
    'value': '80fb5168-cdf1-11e8-a8d5-f2801f1b9fd1',
    'onBlur': jest.fn(),
    'onChange': jest.fn(),
    'onFocus': jest.fn()
  },
  'meta': {
    'active': false,
    'data': '{}',
    'dirty': true,
    'dirtySinceLastSubmit': false,
    'invalid': false,
    'modified': false,
    'modifiedSinceLastSubmit': false,
    'pristine': false,
    'submitFailed': false,
    'submitSucceeded': false,
    'submitting': false,
    'touched': false,
    'valid': true,
    'validating': false,
    'visited': false
  },
  'duplicateMessage': <FormattedMessage id="stripes-erm-components.organizations.duplicateOrgError" values={{ orgName: 'testOrg' }} />,
  'duplicateWarning': false,
  'headerEnd': 'Replace organization',
  'headerStart': 'Organization',
  'id': 'orgs-0',
  'org': {
    'name': 'American Chemical Society',
    'orgsUuid': '80fb5168-cdf1-11e8-a8d5-f2801f1b9fd1'
  },
  'setDuplicateWarning': jest.fn(),
  'fetchCredentials': jest.fn()
};

const initialValues = {
  'data': {
    'agreementLines': '[{…}, {…}, {…}]',
    'agreementLinesToAdd': '[]',
    'agreementStatusValues': '[{…}, {…}, {…}, {…}, {…}]',
    'reasonForClosureValues': '[{…}, {…}, {…}, {…}]',
    'amendmentStatusValues': '[{…}, {…}, {…}, {…}]',
    'basket': '[{…}, {…}]',
    'contactRoleValues': '[{…}, {…}, {…}, {…}]',
    'documentCategories': '[{…}, {…}, {…}]',
    'isPerpetualValues': '[]',
    'licenseLinkStatusValues': '[{…}, {…}, {…}]',
    'orderLines': [{
      'id': '647c1dca-b9bf-47af-8456-bfb6dfef9eee',
      'edition': 'First edition',
      'checkinItems': false,
      'agreementId': '0a79add6-f1a3-44f8-b75d-092c0b729286',
      'acquisitionMethod': 'df26d81b-9d63-4ff8-bf41-49bf75cfa70e',
      'automaticExport': false,
      'alerts': '[]',
      'cancellationRestriction': false,
      'cancellationRestrictionNote': '',
      'claims': '[{…}]',
      'collection': false,
      'contributors': '[{…}, {…}]',
      'cost': '{additionalCost: 0, currency: "USD", discount: 21, …}',
      'description': '',
      'details': '{productIds: Array(2), receivingNote: "2 copies", s…}',
      'donor': '',
      'fundDistribution': '[{…}]',
      'isPackage': false,
      'locations': '[{…}]',
      'orderFormat': 'Physical Resource',
      'paymentStatus': 'Pending',
      'physical': '{createInventory: "Instance, Holding, Item", materi…}',
      'poLineDescription': '',
      'poLineNumber': '101125-1',
      'publicationDate': '2004',
      'publisher': 'MIT Press',
      'purchaseOrderId': '9447d062-89ec-486e-a14b-572f3efb9f8c',
      'receiptStatus': 'Pending',
      'reportingCodes': '[]',
      'requester': '',
      'rush': false,
      'selector': '',
      'source': 'User',
      'tags': '{tagList: Array(2)}',
      'titleOrPackage': 'A semantic web primer',
      'vendorDetail': '{instructions: "", noteFromVendor: "", referenceNum…}',
      'metadata': '{createdDate: "2022-07-05T13:49:25.299+00:00", upda…}'
    }],
    'acquisitionMethod': '[]',
    'orgRoleValues': [{
      'id': '2c91809c81ce99960181cea097b30032',
      'value': 'content_provider',
      'label': 'Content provider'
    }],
    'renewalPriorityValues': '[{…}, {…}, {…}]',
    'users': '[{…}]'
  },
  'handlers': {
    'onBasketLinesAdded': jest.fn(),
    'onClose': jest.fn()
  },
  'initialValues': {
    'id': 'db900d04-d356-4955-817c-10dd35ed4b48',
    'cancellationDeadline': '2022-07-20',
    'dateCreated': '2022-07-06T08:50:17Z',
    'items': [{
      'id': '454c520c-47d3-41a0-afba-bc3c00f0f120',
      'dateCreated': '2022-07-06T11:28:21Z',
      'tags': '[]',
      'lastUpdated': '2022-07-06T11:28:21Z',
      'owner': '{id: "db900d04-d356-4955-817c-10dd35ed4b48"}',
      'resource': '{_object: {…}, alternateResourceNames: Array(0), cl…}',
      'poLines': '[]',
      'suppressFromDiscovery': false,
      'customCoverage': false,
      'explanation': 'Agreement includes a package containing this item',
      'startDate': null,
      'endDate': null,
      'activeFrom': null,
      'activeTo': null,
      'contentUpdated': null,
      'haveAccess': true
    },
    {
      'id': '1e4f9a94-1831-4b9b-a0d0-8215d624c1a0',
      'dateCreated': '2022-07-06T11:01:52Z',
      'tags': '[]',
      'lastUpdated': '2022-07-06T11:28:21Z',
      'owner': '{id: "db900d04-d356-4955-817c-10dd35ed4b48"}',
      'resource': '{_object: {…}, alternateResourceNames: Array(1), cl…}',
      'poLines': '[]',
      'suppressFromDiscovery': false,
      'customCoverage': false,
      'explanation': 'Agreement includes a package containing this item',
      'startDate': null,
      'endDate': null,
      'activeFrom': null,
      'activeTo': null,
      'contentUpdated': null,
      'haveAccess': true
    },
    {
      'id': 'eb788f1a-6e72-42b9-b4cf-d78b2fc2f031',
      'dateCreated': '2022-07-06T09:16:15Z',
      'tags': '[]',
      'lastUpdated': '2022-07-06T11:28:21Z',
      'owner': '{id: "db900d04-d356-4955-817c-10dd35ed4b48"}',
      'resource': {
        'id': 'a81e1d55-761f-4e38-a68c-27c371ab97c6',
        'class': 'org.olf.kb.PackageContentItem',
        'name': "'19th century music' on Platform 'JSTOR' in Package JSTOR : Arts & Sciences III Collection : NK",
        'suppressFromDiscovery': false,
        'tags': [],
        'alternateResourceNames': [],
        'coverage': [{
          'id': '42cff086-47ba-45b2-beb6-ff378be6fee2',
          'startDate': '1977-01-01',
          'startVolume': '1',
          'startIssue': '1',
          'summary': 'v1/i1/1977-01-01 - v*/i*/*'
        }],
        'customCoverage': false,
        '_object': {
          'id': 'a81e1d55-761f-4e38-a68c-27c371ab97c6',
          'dateCreated': '2022-07-05T14:13:06Z',
          'tags': '[]',
          'matchKeys': '[{…}, {…}, {…}, {…}, {…}]',
          'lastUpdated': '2022-07-05T14:13:06Z',
          'coverage': '[{…}]',
          'pti': '{class: "org.olf.kb.PlatformTitleInstance", coverag…}',
          'pkg': '{alternateResourceNames: Array(1), class: "org.olf.…}',
          'embargo': '{movingWallEnd: {…}}',
          'addedTimestamp': 1657030386308,
          'alternateResourceNames': '[]',
          'name': "'19th century music' on Platform 'JSTOR' in Package JSTOR : Arts & Sciences III Collection : NK",
          'lastSeenTimestamp': 1657030386308,
          'suppressFromDiscovery': false,
          'longName': "'19th century music' on Platform 'JSTOR' in Package JSTOR : Arts & Sciences III Collection : NK",
          'class': 'org.olf.kb.PackageContentItem'
        }
      },
      'poLines': [{
        'id': '2668d1f9-4a71-4b47-8708-294f0e30174c',
        'poLineId': '647c1dca-b9bf-47af-8456-bfb6dfef9eee',
        'owner': '{id: "eb788f1a-6e72-42b9-b4cf-d78b2fc2f031"}'
      }],
      'suppressFromDiscovery': false,
      'customCoverage': false,
      'explanation': 'Agreement includes this item from a package specifically',
      'startDate': null,
      'endDate': null,
      'activeFrom': null,
      'activeTo': null,
      'contentUpdated': null,
      'haveAccess': true
    }
    ],
    'name': 'MR Agreement',
    'orgs': '[]',
    'externalLicenseDocs': '[]',
    'outwardRelationships': '[]',
    'customProperties': '{}',
    'contacts': [{
      'id': 'fbd6270a-cd53-44ea-98a1-203277451239',
      'owner': '{id: "db900d04-d356-4955-817c-10dd35ed4b48"}',
      'role': 'authorized_signatory',
      'user': 'd94d2870-6ca8-4ab3-9fcd-bac80f275cb6'
    }],
    'tags': '[]',
    'lastUpdated': '2022-07-06T11:28:21Z',
    'inwardRelationships': '[]',
    'endDate': '2022-07-31',
    'startDate': '2022-07-20',
    'linkedLicenses': '[]',
    'docs': '[]',
    'periods': [{
      'id': '237a8aea-1a5b-4e6e-86e0-b8ba48823308',
      'startDate': '2022-07-20',
      'cancellationDeadline': '2022-07-20',
      'owner': '{id: "db900d04-d356-4955-817c-10dd35ed4b48"}',
      'endDate': '2022-07-31',
      'periodStatus': 'next'
    }],
    'usageDataProviders': '[]',
    'agreementStatus': 'active',
    'supplementaryDocs': '[]',
    'alternateNames': [{
      'id': '488ec0cb-f154-46bd-83b2-bee633012427',
      'owner': {
        'id': 'db900d04-d356-4955-817c-10dd35ed4b48'
      },
      'name': 'Test Agreement'
    }],
    'version': 6,
    'relatedAgreements': '[]'
  },
  'isLoading': false,
  'onSubmit': jest.fn()
};

const interfacesProps = {
  'input': {
    'name': 'orgs[0].org.orgsUuid',
    'value': '80fb5168-cdf1-11e8-a8d5-f2801f1b9fd1',
    'onBlur': jest.fn(),
    'onChange': jest.fn(),
    'onFocus': jest.fn()
  },
  'meta': {
    'active': false,
    'data': '{}',
    'dirty': true,
    'dirtySinceLastSubmit': false,
    'invalid': false,
    'modified': false,
    'modifiedSinceLastSubmit': false,
    'pristine': false,
    'submitFailed': false,
    'submitSucceeded': false,
    'submitting': false,
    'touched': false,
    'valid': true,
    'validating': false,
    'visited': false
  },
  'duplicateMessage': <FormattedMessage id="stripes-erm-components.organizations.duplicateOrgError" values={{ orgName: 'testOrg' }} />,
  'duplicateWarning': false,
  'headerEnd': 'Replace organization',
  'headerStart': 'Organization',
  'id': 'orgs-0',
  'org': {
    'name': 'American Chemical Society',
    'orgsUuid': '80fb5168-cdf1-11e8-a8d5-f2801f1b9fd1'
  },
  'setDuplicateWarning': jest.fn(),
  'fetchCredentials': jest.fn(),
  'roles': [{
    'id': '03264160-6934-4fd3-9dc7-a7cde84d2fed',
    'owner': {
      'id': '61e72b97-1fdc-4be6-85c3-a803d5362bdf'
    },
    'role': {
      'id': '2c91809c81d655390181d65c05990007',
      'value': 'content_provider',
      'label': 'Content provider'
    },
    'note': 'test'
  }],
  'note': 'test',
  'interfaces': [
    { id: 'fae74b9c-5338-4cd6-8a17-47c750d40b7b' },
    { id: 'cd592659-77aa-4eb3-ac34-c9a4657bb20f' },
  ],
};

export {
  emptyFieldProps,
  props,
  initialValues,
  interfacesProps
};
