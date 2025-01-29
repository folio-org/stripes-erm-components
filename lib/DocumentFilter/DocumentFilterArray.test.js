import { MemoryRouter } from 'react-router-dom';

import { waitFor, fireEvent } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Button, TestForm, Dropdown } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import DocumentFilterArray from './DocumentFilterArray';

const translatedContentOptions = [
  {
    'value': 'alternateNames',
    'label': 'Alternative names'
  },
  {
    'value': 'agreementContentTypes',
    'label': 'Content types'
  },
  {
    'value': 'contacts',
    'label': 'Internal contacts'
  },
  {
    'value': 'orgs',
    'label': 'Organizations'
  },
  {
    'value': 'items',
    'label': 'Agreement lines'
  },
  {
    'value': 'linkedLicenses',
    'label': 'Linked licenses'
  },
  {
    'value': 'externalLicenseDocs',
    'label': 'External licenses'
  },
  {
    'value': 'supplementaryDocs',
    'label': 'Supplementary documents'
  },
  {
    'value': 'usageDataProviders',
    'label': 'Usage data'
  },
  {
    'value': 'relatedAgreements',
    'label': 'Related agreements'
  },
  {
    'value': 'tags',
    'label': 'Tags'
  }
];

const onSubmit = jest.fn();

let renderComponent;
describe('DocumentFilterArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <DocumentFilterArray
            name="agreementContent"
            translatedContentOptions={translatedContentOptions}
          />
        </TestForm>,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the add filter dropdown', async () => {
    await Dropdown('Add filter').exists();
  });


  describe('clicking Add filter dropdown', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Add filter').click();
      });
    });

    it('should render the \'AND\' and \'OR\' filter buttons', async () => {
      await Button('AND').exists();
      await Button('OR').exists();
    });
  });

  describe('clicking OR button', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Add filter').click();
        await Button('OR').click();
      });
    });

    it('should display the OR label', async () => {
      const { getAllByText } = renderComponent;
      await waitFor(async () => {
        expect(getAllByText('OR').length).toEqual(2);
      });
    });
  });

  describe('clicking the AND button', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await Button('Add filter').click();
        await Button('AND').click();
      });
    });

    it('adds a new filter with grouping set to &&', async () => {
      const { getAllByText } = renderComponent;
      await waitFor(async () => {
        expect(getAllByText('AND').length).toEqual(2);
      });
    });
  });

  test('adding multiple filters', async () => {
    const { getByText, getAllByText } = renderComponent;
    fireEvent.click(getByText('Add filter'));
    fireEvent.click(getByText('AND'));
    fireEvent.click(getByText('Add filter'));
    fireEvent.click(getByText('OR'));
    await waitFor(() => {
      expect(getAllByText('AND').length).toEqual(2);
      expect(getAllByText('OR').length).toEqual(2);
    });
  });
});
