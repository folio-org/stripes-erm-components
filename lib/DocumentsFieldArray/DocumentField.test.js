import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../test/jest/__mock__';
import { renderWithIntl, TestForm } from '@folio/stripes-erm-components/test/jest/helpers';
import DocumentField from './DocumentField';

import translationsProperties from '../../tests/helpers/translationsProperties';

const onSubmit = jest.fn();

describe('DocumentField', () => {
  test('renders expected fields', () => {
    const { getByTestId, getByRole } = renderWithIntl(
      <TestForm onSubmit={onSubmit}>
        <DocumentField
          index={0}
          input={{
            name: 'documentTest'
          }}
        />
      </TestForm>, translationsProperties
    );

    expect(getByTestId('documentField')).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /start date/i })).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /start volume/i })).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /start issue/i })).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /end date/i })).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /end volume/i })).toBeInTheDocument();
    // expect(getByRole('textbox', { name: /end issue/i })).toBeInTheDocument();
  });
});
