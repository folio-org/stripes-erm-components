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
    'label': 'important',
    'id': 'a599ffde-e631-4f21-b64d-3cb985f7d628',
  },
  {
    'label': 'urgent',
    'description': 'Requires urgent attention',
    'id': '971026a1-5269-457d-9db3-0059a8c9dae7',
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
