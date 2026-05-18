import { MemoryRouter } from 'react-router-dom';
import {
  Accordion,
  MultiSelect,
  renderWithIntl
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import TagsFilter from './TagsFilter';

const activeFilters = {
  tags: ['tag1']
};

const filterHandlers = {
  state: jest.fn(),
  clearGroup: jest.fn(),
};

const tags = [
  {
    'id': 4,
    'normValue': 'urgent',
    'value': 'urgent'
  },
  {
    'id': 2,
    'normValue': 'important',
    'value': 'important'
  }
];

describe('TagsFilter', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <TagsFilter
          activeFilters={activeFilters}
          filterHandlers={filterHandlers}
          tags={tags}
        />
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the Tags Accordion', async () => {
    await Accordion('Tags').exists();
  });

  test('renders the MultiSelect component', async () => {
    await MultiSelect({ id: 'tags-filter' }).exists();
  });
});
