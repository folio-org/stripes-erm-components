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
const handleSubmit = jest.fn();

let renderComponent;
describe('DocumentFilterArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <DocumentFilterArray
            handleSubmit={handleSubmit}
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

  test('submits the form', async () => {
    const { getByText } = renderComponent;
    fireEvent.click(getByText('Submit'));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  describe('translatedContentOptions array', () => {
    test('should contain the correct number of entries', () => {
      expect(translatedContentOptions.length).toBe(11);
    });

    test('should contain specific option labels', () => {
      const labels = translatedContentOptions.map(option => option.label);
      expect(labels).toContain('Alternative names');
      expect(labels).toContain('Content types');
      expect(labels).toContain('Internal contacts');
      expect(labels).toContain('Organizations');
      expect(labels).toContain('Agreement lines');
      expect(labels).toContain('Linked licenses');
      expect(labels).toContain('External licenses');
      expect(labels).toContain('Supplementary documents');
      expect(labels).toContain('Usage data');
      expect(labels).toContain('Related agreements');
      expect(labels).toContain('Tags');
    });
  });

  test('clicking the IconButton removes the field ', async () => {
    const { getAllByRole, queryAllByText } = renderComponent;

    // Ensure there is an OR button added for testing removal
    fireEvent.click(queryAllByText('Add filter')[0]);
    fireEvent.click(queryAllByText('OR')[0]);

    const removeButton = getAllByRole('button', { icon: /times-circle-solid/i })[0];
    fireEvent.click(removeButton);
  });
});
