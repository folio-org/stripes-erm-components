import React from 'react';

import { StaticRouter as Router } from 'react-router-dom';
import { KeyValue } from '@folio/stripes-testing';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import LicenseCard from './LicenseCard';

const license = {
  'id': 'c19037a9-8a71-47be-b504-94b6a5040b5b',
  'endDateSemantics': {
    'id': '02d31828818136bd018181390f5f000d',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '02d31828818136bd018181390f5b000c',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-06-29T08:07:23Z',
  'customProperties': {},
  'contacts': [],
  'tags': [],
  'lastUpdated': '2022-06-29T08:07:23Z',
  'docs': [],
  'name': 'Test License 1',
  'status': {
    'id': '02d31828818136bd018181390f960013',
    'value': 'active',
    'label': 'Active',
    'owner': {
      'id': '02d31828818136bd018181390f7d0010',
      'desc': 'License.Status',
      'internal': true
    }
  },
  'supplementaryDocs': [],
  'description': 'tests license 1',
  'startDate': '2022-06-01',
  'endDate': '2023-07-01',
  'openEnded': false,
  'amendments': [],
  'orgs': [
    {
      'id': '7dc1ae2e-6050-45f5-b98b-49a967e2bdb0',
      'primaryOrg': true,
      'org': {
        'id': 'b475c378-9264-46e3-81cd-1db2b5d8ab8f',
        'orgsUuid': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
        'name': 'Alexander Street Press',
        'orgsUuid_object': {
          'id': '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1',
          'name': 'Alexander Street Press',
          'code': 'ALEXS',
          'description': 'AV streaming services',
          'exportToAccounting': false,
          'status': 'Active',
          'language': 'en-us',
          'aliases': [
            {
              'value': 'Alexander Street',
              'description': ''
            }
          ],
          'addresses': [
            {
              'addressLine1': '3212 Duke Street',
              'addressLine2': '',
              'city': 'Alexandria',
              'stateRegion': 'VA',
              'zipCode': '22314',
              'country': 'USA',
              'isPrimary': true,
              'categories': [],
              'language': 'English'
            }
          ],
          'phoneNumbers': [
            {
              'phoneNumber': '1-800-889-5937',
              'categories': [],
              'isPrimary': true,
              'language': 'English'
            }
          ],
          'emails': [
            {
              'value': 'customerservice@alexanderstreet.com',
              'description': 'main customer service email',
              'isPrimary': true,
              'categories': [],
              'language': 'English'
            }
          ],
          'urls': [
            {
              'value': 'https://alexanderstreet.com/',
              'description': 'main website',
              'language': 'en-us',
              'isPrimary': true,
              'categories': [
                'f52ceea4-8e35-404b-9ebd-5c7db6613195'
              ],
              'notes': ''
            }
          ],
          'contacts': [
            '11fb627a-cdf1-11e8-a8d5-f2801f1b9fd1'
          ],
          'agreements': [
            {
              'name': 'library access',
              'discount': 0,
              'referenceUrl': '',
              'notes': ''
            }
          ],
          'erpCode': 'G64758-74828',
          'paymentMethod': 'Physical Check',
          'accessProvider': true,
          'governmental': false,
          'licensor': true,
          'materialSupplier': true,
          'vendorCurrencies': [
            'USD'
          ],
          'claimingInterval': 0,
          'discountPercent': 0,
          'expectedActivationInterval': 1,
          'expectedInvoiceInterval': 30,
          'renewalActivationInterval': 365,
          'subscriptionInterval': 365,
          'expectedReceiptInterval': 30,
          'taxId': '',
          'liableForVat': false,
          'taxPercentage': 0,
          'interfaces': [
            '14e81009-0f98-45a0-b8e6-e25547beb22f'
          ],
          'accounts': [
            {
              'name': 'Library account',
              'accountNo': '1234',
              'description': 'Main library account',
              'appSystemNo': '',
              'paymentMethod': 'Physical Check',
              'accountStatus': 'Active',
              'contactInfo': 'customerservice@alexanderstreet.com',
              'libraryCode': 'COB',
              'libraryEdiCode': '765987610',
              'notes': '',
              'acqUnitIds': []
            }
          ],
          'isVendor': true,
          'sanCode': '1234567',
          'changelogs': [
            {
              'description': 'This is a sample note.',
              'timestamp': '2008-05-15T10:53:00.000+00:00'
            }
          ],
          'acqUnitIds': [],
          'metadata': {
            'createdDate': '2022-03-01T02:51:45.110+00:00',
            'updatedDate': '2022-03-01T02:51:45.110+00:00'
          }
        }
      },
      'owner': {
        'id': 'c19037a9-8a71-47be-b504-94b6a5040b5b'
      },
      'roles': [
        {
          'id': '8ee4f106-0c94-4e71-91bc-4f1568c496a0',
          'owner': {
            'id': '7dc1ae2e-6050-45f5-b98b-49a967e2bdb0'
          },
          'role': {
            'id': '02d31828818136bd018181390ef60001',
            'value': 'licensor',
            'label': 'Licensor',
            'owner': {
              'id': '02d31828818136bd018181390ec70000',
              'desc': 'LicenseOrg.Role',
              'internal': false
            }
          }
        }
      ],
      'interfaces': [
        {
          'id': '14e81009-0f98-45a0-b8e6-e25547beb22f',
          'name': 'Academic Video Online',
          'uri': 'https://search.alexanderstreet.com/avon',
          'available': false,
          'type': [],
          'metadata': {
            'createdDate': '2022-03-01T02:51:47.017+00:00',
            'updatedDate': '2022-03-01T02:51:47.017+00:00'
          }
        }
      ]
    }
  ],
  'type': {
    'id': '02d31828818136bd018181390fb90017',
    'value': 'local',
    'label': 'Local',
    'owner': {
      'id': '02d31828818136bd018181390fb60016',
      'desc': 'License.Type',
      'internal': false
    }
  },
  'alternateNames': []
};

let renderComponent;
describe('LicenseCard', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <LicenseCard
          license={license}
          renderName
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders a link with the license name', async () => {
    const { getByRole } = renderComponent;
    expect(getByRole('link', { name: 'Test License 1' })).toBeInTheDocument();
  });

  test('renders the expected type', async () => {
    await KeyValue('Type').has({ value: 'Local' });
  });

  test('renders the expected status', async () => {
    await KeyValue('Status').has({ value: 'Active' });
  });

  test('renders the expected start date', async () => {
    await KeyValue('Start date').has({ value: '6/1/2022' });
  });

  test('renders the expected end date', async () => {
    await KeyValue('End date').has({ value: '7/1/2023' });
  });

  test('renders the expected primary organization', async () => {
    await KeyValue('Primary organization').has({ value: 'Alexander Street Press' });
  });
});
