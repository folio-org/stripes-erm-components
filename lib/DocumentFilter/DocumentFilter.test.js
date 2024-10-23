import { MemoryRouter } from 'react-router-dom';
import {
  Button,
  Accordion,
  renderWithIntl,
  TestForm,
} from '@folio/stripes-erm-testing';

import { Button as StripesButton } from '@folio/stripes/components';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilter from './DocumentFilter';

const testPFD = jest.fn();

jest.mock('./DocumentFilterForm', () => ({
  editingFilters,
  filters,
  handlers,
  onSubmit
}) => {
  return (
    <div>
      <StripesButton onClick={() => handlers.openEditModal()}>OPEN</StripesButton>
      <StripesButton onClick={() => handlers.closeEditModal()}>CLOSE</StripesButton>
      {editingFilters ? 'editingFilters' : ''}
      <StripesButton
        onClick={() => onSubmit({
          filters: [{
            rules: [{
              comparator: '==',
              path: 'docs.name',
              value: 'do the test'
            }]
          }]
        })
        }
      >
        SUBMIT
      </StripesButton>
      <StripesButton onClick={() => testPFD(filters)}>Test parsed filter data</StripesButton>
      DocumentFilterForm
    </div>
  );
});

const stateMock = jest.fn();
const activeFilters = { docs: ['(docs.name==testing)'] };
const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};

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

let renderComponent;
describe('DocumentFilter', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <DocumentFilter
          activeFilters={activeFilters}
          categoryValues={categoryValues}
          filterHandlers={filterHandlers}
        />,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the document filters accordion', async () => {
    await Accordion('Documents').exists();
  });

  it('renders DocumentFilterForm component', () => {
    const { getByText } = renderComponent;
    expect(getByText('DocumentFilterForm')).toBeInTheDocument();
  });

  // TODO
  // Test editingFilters is false at first
  // Describe "Clicking open"
    // Test editingFilters is true
    // Describe clicking close
      // Test editingFilters is false

  // Open editingFilters
  // Click submit
    // test stateMock.calls[0][0] is {docs: ["docs.name==do the test"]}
    // test editingFIlters is false

    // Click "test parsed filter data"
    // test testPFD.mock.calls[0][0] is [{ rules: [ { comparator: '==', path: 'docs.name', value: 'testing' }]}]
    // Test that when activeFilters are empty there's no clear button and no label
    // Test that when active filters aren't empty (above) that there is for both
  });
