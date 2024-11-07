import { MemoryRouter } from 'react-router-dom';
import {
  fireEvent,
  waitFor,
} from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const onSubmit = jest.fn();
jest.mock('./DocumentFilterField', () => () => <div>DocumentFilterField</div>);
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

  test('renders the document filters button', async () => {
    await waitFor(async () => {
      await Button('Add filter').exists();
      await Button('Add filter').click();
      // expect('DocumentFilterField').toBeInTheDocument();
    });
  });


  test('renders the document filters button', async () => {
    await waitFor(async () => {
      const { getByText } = renderComponent;
      const addButton = getByText('Add filter');
      fireEvent.click(addButton);
      // Here you would check if the filter was added, e.g., by checking the number of filters
      // This part depends on how you want to verify the addition of the filter
    });
  });

  // TODO mock DocumentFilterField
  // Test adding renders card as expected
  // Test card delete removes an item
  // Test card heading shows right label
  // Test multiples are separated by OR (check this scales with right number of ORs for 2/3/4 items)
});
