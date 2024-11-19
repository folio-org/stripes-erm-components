import { MemoryRouter } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
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
          <DocumentFilterFieldArray
            categoryValues={categoryValues}
            filterName="docs"
          />
        </TestForm>,
      </MemoryRouter>,
      translationsProperties
    );
  });

  it('renders the Add filter button', async () => {
    await Button('Add filter').exists();
  });

  describe('clicking \'Add filter\' button', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Add filter').click();
      });
    });

    it('should display Document filter 1', async () => {
      const { getByText } = renderComponent;
      expect(getByText('Document filter 1')).toBeInTheDocument();
    });

    it('should not render a \'Delete filter 1\' button', async () => {
      const { queryByRole } = renderComponent;

      await waitFor(async () => {
        // IconButton calls not working right now
        // await IconButton('Delete filter 1').absent();
        expect(queryByRole('button', { name: 'Delete filter 1' })).not.toBeInTheDocument();
      });
    });

    it('should not display Document filter 2', async () => {
      const { queryByText } = renderComponent;
      expect(queryByText('Document filter 2')).not.toBeInTheDocument();
    });

    it('should render the document filter field component', async () => {
      const { getByText } = renderComponent;
      await waitFor(async () => {
        expect(getByText('DocumentFilterField')).toBeInTheDocument();
      });
    });

    describe('clicking \'Add filter\' button again', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Add filter').click();
        });
      });

      it('should display Document filter 2', async () => {
        const { getByText } = renderComponent;
        expect(getByText('Document filter 2')).toBeInTheDocument();
      });

      it('should render a \'Delete filter 2\' button', async () => {
        const { queryByRole } = renderComponent;

        await waitFor(async () => {
          // IconButton calls not working right now
          // await IconButton('Delete filter 2').exists();
          expect(queryByRole('button', { name: 'Delete filter 2' })).toBeInTheDocument();
        });
      });
    });
  });
});
