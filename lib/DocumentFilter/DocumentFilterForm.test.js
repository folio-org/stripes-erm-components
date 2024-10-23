import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilterForm from './DocumentFilterForm';

jest.mock('./DocumentFilterFieldArray', () => () => (
  <div>DocumentFilterFieldArray</div>
));

const onSubmit = jest.fn();
const handlers = {
  closeEditModal: jest.fn(),
  openEditModal: jest.fn(),
};

const filterModalProps = {};
const categoryValues = [
  {
    'id': '2c9180a09262108601926219be050022',
    'value': 'consortium_negotiation_document',
    'label': 'Consortium negotiation document',
  },
  {
    'id': '2c9180a09262108601926219bdfc0020',
    'value': 'license',
    'label': 'License',
  },
  {
    'id': '2c9180a09262108601926219be010021',
    'value': 'misc',
    'label': 'Misc',
  },
];

const filters = [];

let renderComponent;
describe('DocumentFilterForm', () => {
  describe('DocumentFilterForm on editing', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm onSubmit={onSubmit}>
            <DocumentFilterForm
              categoryValues={categoryValues}
              editingFilters
              filterModalProps={filterModalProps}
              filterName="docs"
              filters={filters}
              handlers={handlers}
              onSubmit={onSubmit}
            />
          </TestForm>
          ,
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the document filters button', async () => {
      await Button('Edit document filters').exists();
    });

    test('renders the DocumentFilterFieldArray component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentFilterFieldArray')).toBeInTheDocument();
    });
  });

  describe('DocumentFilterForm on adding', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <TestForm onSubmit={onSubmit}>
            <DocumentFilterForm
              categoryValues={categoryValues}
              editingFilters={false}
              filterModalProps={filterModalProps}
              filterName="docs"
              filters={filters}
              handlers={handlers}
              onSubmit={onSubmit}
            />
          </TestForm>
          ,
        </MemoryRouter>,
        translationsProperties
      );
    });

    test('renders the document filters button', async () => {
      await Button('Edit document filters').exists();
    });
  });
});
