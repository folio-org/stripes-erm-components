import React from 'react';
import userEvent from '@testing-library/user-event';
import '../../test/jest/__mock__';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';
import DocumentField from './DocumentField';

import translationsProperties from '../../tests/helpers/translationsProperties';

const onSubmit = jest.fn();

const documentCategories = [
  {
    'id': '2c9180ad7f1f52ef017f1f548587003f',
    'value': 'license',
    'label': 'License'
  },
  {
    'id': '2c9180ad7f1f52ef017f1f5485940040',
    'value': 'misc',
    'label': 'Misc'
  },
  {
    'id': '2c9180ad7f1f52ef017f1f54859e0041',
    'value': 'consortium_negotiation_document',
    'label': 'Consortium negotiation document'
  }
];

describe('DocumentField', () => {
  test('renders expected fields', () => {
    const { getByTestId, getByRole } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <DocumentField
          documentCategories={documentCategories}
          index={0}
          input={{
            name: 'documentTest'
          }}
        />
      </TestForm>, translationsProperties
    );

    expect(getByTestId('documentField')).toBeInTheDocument();
    expect(getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(getByRole('combobox', { name: /category/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /note/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /physical location/i })).toBeInTheDocument();
    expect(getByRole('textbox', { name: /url/i })).toBeInTheDocument();
  });

  test('expected values are submitted', () => {
    const { getByRole, getByTestId } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <DocumentField
          documentCategories={documentCategories}
          index={0}
          input={{
            name: 'documentTest'
          }}
        />
      </TestForm>, translationsProperties
    );
    userEvent.type(getByRole('textbox', { name: /name/i }), 'document 3');
    userEvent.selectOptions(getByRole('combobox', { name: /category/i }), 'misc');
    userEvent.type(getByRole('textbox', { name: /note/i }), 'URL');
    userEvent.type(getByRole('textbox', { name: /physical location/i }), 'shelf');
    userEvent.type(getByRole('textbox', { name: /url/i }), 'https://docume.nt');

    userEvent.click(getByTestId('submit'));
    expect(onSubmit.mock.calls.length).toBe(1);
    const submittedValues = onSubmit.mock.calls[0][0];
    const expectedPayload = {
      documentTest: {
        atType: 'misc',
        name: 'document 3',
        note: 'URL',
        location: 'shelf',
        url: 'https://docume.nt',
      }
    };
    expect(submittedValues).toEqual(expectedPayload);
  });
});
