import { MemoryRouter } from 'react-router-dom';

import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilterFieldArray from './DocumentFilterFieldArray';

const onSubmit = jest.fn();

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

describe('DocumentFilterFieldArray', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <DocumentFilterFieldArray
            categoryValues={categoryValues}
            filterName="docs"
          />
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the document filters button', async () => {
    await Button('Add filter').exists();
  });

  // TODO mock DocumentFilterField
  // Test adding renders card as expected
  // Test card delete removes an item
  // Test card heading shows right label
  // Test multiples are separated by OR (check this scales with right number of ORs for 2/3/4 items)
});
