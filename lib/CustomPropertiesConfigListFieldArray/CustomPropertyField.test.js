import React from 'react';
import '../../test/jest/__mock__';
import { Field } from 'react-final-form';
import { screen } from '@testing-library/react';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import CustomPropertyField from './CustomPropertyField';
import translationsProperties from '../../tests/helpers/translationsProperties';

jest.mock('./CustomPropertyFieldEdit', () => () => <div>CustomPropertyFieldEdit</div>);
jest.mock('./CustomPropertyFieldView', () => () => <div>CustomPropertyFieldView</div>);

const onSubmit = jest.fn();
const onSave = jest.fn();
const onDelete = jest.fn();

const initialValues = {
  'id': 'd73ba9f9-8576-4164-bb88-b9cbbf09443d',
  'endDateSemantics': {
    'id': '2c91809d80aba3e80180abaa43c8000e',
    'value': 'explicit',
    'label': 'Explicit',
    'owner': {
      'id': '2c91809d80aba3e80180abaa43c4000d',
      'desc': 'License.EndDateSemantics',
      'internal': true
    }
  },
  'dateCreated': '2022-05-10T13:57:06Z',
  'customProperties': {
    'concurrentAccess': [{
      'id': 2,
      'publicNote': 'public note',
      'note': 'International note',
      'internal': true,
      'value': 54,
      'type': {
        'id': '2c91809d80aba3e80180abaa46570031',
        'retired': false,
        'name': 'concurrentAccess',
        'primary': true,
        'defaultInternal': true,
        'label': 'Number of concurrent users allowed',
        'description': 'The number of concurrent users allowed by the resource',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
      }
    }],
    'metadataUsage': [{
      'id': 3,
      'internal': true,
      'value': 'this is value',
      'type': {
        'id': '2c91809d80aba3e80180abaa48190040',
        'retired': false,
        'name': 'metadataUsage',
        'primary': false,
        'defaultInternal': true,
        'label': 'Metadata usage',
        'description': 'Any restrictions expressed related to the use of metadata in the platforms',
        'weight': 0,
        'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyText'
      }
    }],
    'authorisedUsers': [{
      '_delete': true
    }],
    'remoteAccess': [{
      '_delete': true
    }],
    'illElectronic': [{
      '_delete': true
    }],
    'copyDigital': [{
      '_delete': true
    }],
    'copyPrint': [{
      '_delete': true
    }],
    'illPrint': [{
      '_delete': true
    }],
    'illSecureElectronic': [{
      '_delete': true
    }],
    'reservesElectronic': [{
      '_delete': true
    }],
    'coursePackElectronic': [{
      '_delete': true
    }],
    'coursePackPrint': [{
      '_delete': true
    }],
    'walkInAccess': [{
      '_delete': true
    }]
  },
  'contacts': '[]',
  'tags': '[]',
  'lastUpdated': '2022-05-10T14:49:52Z',
  'docs': '[]',
  'name': 'test',
  'status': 'active',
  'supplementaryDocs': '[]',
  'startDate': '2022-05-04',
  'endDate': '2022-05-20',
  'openEnded': false,
  'amendments': '[]',
  'orgs': '[]',
  'type': 'national',
  'alternateNames': [{
    'id': 'f4d82585-3447-4e2a-af34-d4a238fd98d8',
    'owner': {
      'id': 'd73ba9f9-8576-4164-bb88-b9cbbf09443d'
    },
    'name': 'name 1'
  },
  {
    'id': '1056cc57-b7bf-4910-9415-e41516945bab',
    'owner': {
      'id': 'd73ba9f9-8576-4164-bb88-b9cbbf09443d'
    },
    'name': 'name 2'
  }
  ]
};

const value = {
  'concurrentAccess': [{
    'id': 2,
    'note': 'note',
    'internal': true,
    'value': 56,
    'type': {
      'id': '2c91809d809474b40180947b2c910031',
      'retired': false,
      'name': 'concurrentAccess',
      'primary': true,
      'defaultInternal': true,
      'label': 'Number of concurrent users allowed',
      'description': 'The number of concurrent users allowed by the resource',
      'weight': 0,
      'type': 'com.k_int.web.toolkit.custprops.types.CustomPropertyInteger'
    }
  }],
  'authorisedUsers': [{
    '_delete': true
  }],
  'remoteAccess': '[{…}]',
  'illElectronic': '[{…}]',
  'copyDigital': [{
    '_delete': true
  }],
  'copyPrint': '[{…}]',
  'illPrint': '[{…}]',
  'illSecureElectronic': '[{…}]',
  'reservesElectronic': '[{…}]',
  'coursePackElectronic': '[{…}]',
  'coursePackPrint': '[{…}]',
  'walkInAccess': '[{…}]'
};

describe('CustomPropertyField', () => {
  describe('CustomPropertyField', () => {
    let renderComponent;
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <TestForm initialValues={initialValues} onSubmit={onSubmit}>
          <Field
            component={CustomPropertyField}
            index={0}
            name="customProperties"
            onDelete={onDelete}
            onSave={onSave}
            value={value}
          />
        </TestForm>,
        translationsProperties
      );
    });

    test('renders the CustomPropertyField component', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('customePropertyField')).toBeInTheDocument();
    });

    test('renders the CustomPropertyFieldEdit component', () => {
      const { getByText } = renderComponent;
      expect(getByText('CustomPropertyFieldEdit')).toBeInTheDocument();
    });
  });
});
