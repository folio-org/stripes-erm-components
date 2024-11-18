import { MemoryRouter } from 'react-router-dom';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { FieldArray } from 'react-final-form-arrays';
import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

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
          <FieldArray
            categoryValues={categoryValues}
            component={DocumentFilterFieldArray}
            name="docs"
          />
        </TestForm>,
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders the Add filter button', async () => {
    await Button('Add filter').exists();
  });

  it('should display Document filter 1 when Add filter is clicked', async () => {
    const { getByText } = renderComponent;
    await waitFor(async () => {
      await Button('Add filter').click();
    });
    expect(getByText('Document filter 1')).toBeInTheDocument();
  });

  test('clicking the "Add filter" button should render the document filter field component', async () => {
    const { getByText } = renderComponent;
    await waitFor(async () => {
      await Button('Add filter').click();
    });
    await waitFor(async () => {
      expect(getByText('DocumentFilterField')).toBeInTheDocument();
    });
  });

  describe('adding multiple filters', () => {
    it('should add multiple filters when the "Add filter" button is clicked again', async () => {
      const { getByRole, getByText } = renderComponent;
      await waitFor(async () => {
        await Button('Add filter').click();
        await Button('Add filter').click();
      });
      await waitFor(async () => {
        expect(getByText('Document filter 2')).toBeInTheDocument();
      });

      await waitFor(async () => {
        // IconButton calls not working right now
        // await IconButton('Delete filter 2').exists();
        expect(getByRole('button', { name: 'Delete filter 2' })).toBeInTheDocument();
      });
    });
  });
});
