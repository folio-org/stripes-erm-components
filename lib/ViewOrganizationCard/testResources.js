import { FormattedMessage } from 'react-intl';

const emptyProps = {
  'duplicateMessage': <FormattedMessage id="stripes-erm-components.organizations.duplicateOrgError" values={{ orgName: 'testOrg' }} />,
  'duplicateWarning': false,
  'headerEnd': 'Link organization',
  'headerStart': 'Organization',
  'id': 'orgs-0',
  'setDuplicateWarning': jest.fn(),
  'fetchCredentials': jest.fn()
};

const props = {
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

const interfacesProps = {
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
  emptyProps,
  props,
  interfacesProps
};
