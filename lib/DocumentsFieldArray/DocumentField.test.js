import React from 'react';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Button,
  Select,
  TestForm,
  TextArea,
  TextField
} from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import DocumentField from './DocumentField';


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

  describe('clicking submit', () => {
    beforeEach(async () => {
      renderWithIntl(
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
      await waitFor(async () => {
        await TextField('Name*').fillIn('document 3'); // Name is required so has an *
        await Select('Category').choose('Misc');
        await TextArea('Note').fillIn('URL');
        await TextField('Physical location').fillIn('shelf');
        await TextField('URL').fillIn('https://docume.nt');
      });

      await waitFor(async () => {
        await Button('Submit').click();
      });
    });

    test('onSubmit was called', async () => {
      await waitFor(async () => {
        expect(onSubmit.mock.calls.length).toBe(1);
      });
    });

    test('expected values are submitted', async () => {
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

      await waitFor(async () => {
        expect(submittedValues).toEqual(expectedPayload);
      });
    });
  });
});
