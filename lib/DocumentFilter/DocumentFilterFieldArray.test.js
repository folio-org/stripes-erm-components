import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { renderWithIntl, Button, TestForm, IconButton } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const onSubmit = jest.fn();
jest.mock('./DocumentFilterField', () => () => <div>DocumentFilterField</div>);

let renderComponent;
describe('DocumentFilterFieldArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <DocumentFilterFieldArray
            categoryValues={categoryValues}
            filterName="docs"
          />
        </TestForm>,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('adding/removing filterd fields using the add/remove works as expected', async () => {
    const { getByText, queryAllByTestId } = renderComponent;
    await Button('Add filter').exists();
    await waitFor(async () => {
      await Button('Add filter').click();
    });

    await waitFor(async () => {
      expect(getByText('DocumentFilterField')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(queryAllByTestId(/document-filter-field\[.*\]/i).length).toEqual(1);
    });

    await waitFor(async () => {
      await Button('Add filter').click();
    });

    await waitFor(async () => {
      expect(queryAllByTestId(/document-filter-field\[.*\]/i).length).toEqual(2);
    });

    await waitFor(async () => {
      await IconButton('remove-filter-field[0]').click();
    });

    await waitFor(async () => {
      expect(queryAllByTestId(/document-filter-field\[.*\]/i).length).toEqual(1);
    });
  });

  test('multiple filters are separated by "OR"card heading shows the right labels', async () => {
    const { getByText, getByRole, queryAllByTestId } = renderComponent;
    await Button('Add filter').exists();

    // adding multiple filters
    await waitFor(async () => {
      await Button('Add filter').click();
      await Button('Add filter').click();
    });

    await waitFor(async () => {
      expect(getByText('Document filter 1')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(getByRole('button', { name: 'Delete filter 1' })).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(getByText('OR')).toBeInTheDocument();
    });

    await waitFor(async () => {
      expect(queryAllByTestId(/document-filter-field\[.*\]/i).length).toEqual(2);
    });
  });
});
