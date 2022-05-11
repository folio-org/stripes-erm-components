import React from 'react';
import '../../test/jest/__mock__';
import { Field } from 'react-final-form';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import CustomPropertyField from './CustomPropertyField';
import translationsProperties from '../../tests/helpers/translationsProperties';

jest.mock('./CustomPropertyFieldEdit', () => () => <div>CustomPropertyFieldEdit</div>);
jest.mock('./CustomPropertyFieldView', () => () => <div>CustomPropertyFieldView</div>);

const onSubmit = jest.fn();
const onSave = jest.fn();
const onDelete = jest.fn();

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
  let renderComponent;
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
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

