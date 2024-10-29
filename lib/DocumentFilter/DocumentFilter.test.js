import { MemoryRouter } from 'react-router-dom';
import {
  Button,
  Accordion,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import { Button as MockStripesButton } from '@folio/stripes/components';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilter from './DocumentFilter';

import { documentFilterParsing } from './testResources';

const mockPFD = jest.fn();

jest.mock('./DocumentFilterForm', () => ({
  filters,
}) => {
  return (
    <div>
      <MockStripesButton onClick={() => mockPFD(filters)}>
        Test parsed filter data
      </MockStripesButton>
      DocumentFilterForm
    </div>
  );
});

const stateMock = jest.fn();
const filterHandlers = {
  state: stateMock,
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};


// Todo these should be centralised
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
  describe.each([
    [
      'with active filters',
      documentFilterParsing.find(dfp => dfp.name === 'simple').deparsed,
      '1 document filters applied',
      documentFilterParsing.find(dfp => dfp.name === 'simple').parsed,
    ],
    [
      'without active filters',
      { docs: [] },
      null,
      []
    ],
    [
      'with multiple active filters',
      documentFilterParsing.find(dfp => dfp.name === 'complex').deparsed,
      '2 document filters applied',
      documentFilterParsing.find(dfp => dfp.name === 'complex').parsed,
    ],
  ])('ActiveFilter tests', (
    activeFilterTitle,
    activeFilterState,
    expectedLayoutText,
    expectedParsedFilterData
  ) => {
    describe(activeFilterTitle, () => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
          <MemoryRouter>
            <DocumentFilter
              activeFilters={activeFilterState}
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

      test('renders expected filters text', async () => {
        const baseLayoutText = /document filters applied/;
        const { queryByText } = renderComponent;
        if (expectedLayoutText != null) {
          expect(queryByText(expectedLayoutText)).toBeInTheDocument();
        } else {
          expect(queryByText(baseLayoutText)).not.toBeInTheDocument();
        }
      });

      it('renders DocumentFilterForm component', () => {
        const { getByText } = renderComponent;
        expect(getByText('DocumentFilterForm')).toBeInTheDocument();
      });

      // TODO
      // Add test for clearing accordion, whether clear button exists etc (mock filterHandlers.state)
      // and check the right value are passed when it's clicked

      describe('testing parsedFilterData', () => {
        beforeEach(async () => {
          mockPFD.mockClear();
          await waitFor(async () => {
            await Button('Test parsed filter data').click();
          });
        });

        test('parsed filter data is as expected', () => {
          expect(mockPFD.mock.calls[0][0]).toEqual(expectedParsedFilterData);
        });
      });
    });
  });

  // TODO
  // Add test for passing in/not passing in labels
});
