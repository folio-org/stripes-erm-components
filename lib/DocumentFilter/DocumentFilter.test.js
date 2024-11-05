import { MemoryRouter } from 'react-router-dom';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import {
  Button,
  Accordion,
  renderWithIntl,
} from '@folio/stripes-erm-testing';

import { Button as MockStripesButton } from '@folio/stripes/components';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilter from './DocumentFilter';

import { documentFilterParsing } from './testResources';

const mockPFD = jest.fn();

jest.mock('./DocumentFilterForm', () => ({ filters }) => {
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

let renderComponent;

describe('DocumentFilter', () => {
  describe('with active filters', () => {
    describe.each([
      [
        'with active filters',
        documentFilterParsing.find((dfp) => dfp.name === 'simple').deparsed,
        '1 document filters applied',
        documentFilterParsing.find((dfp) => dfp.name === 'simple').parsed,
      ],
      [
        'with multiple active filters',
        documentFilterParsing.find((dfp) => dfp.name === 'complex').deparsed,
        '2 document filters applied',
        documentFilterParsing.find((dfp) => dfp.name === 'complex').parsed,
      ],
    ])(
      'ActiveFilter tests',
      (
        activeFilterTitle,
        activeFilterState,
        expectedLayoutText,
        expectedParsedFilterData
      ) => {
        describe(activeFilterTitle, () => {
          beforeEach(async () => {
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

          it('renders the document filters accordion', async () => {
            await Accordion('Documents').exists();
          });

          it('renders expected filters text', async () => {
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

          it('should clear the selected document filters by clicking on the clear button', () => {
            const { getByRole, queryAllByTestId } = renderComponent;
            expect(getByRole('button', { name: 'stripes-components.filterGroups.clearFilterSetLabel' })).toBeInTheDocument();
            userEvent.click(getByRole('button', { name: 'stripes-components.filterGroups.clearFilterSetLabel' }));
            expect(queryAllByTestId(/document filters applied\[.*\]/i).length).toEqual(0);
          });

          describe('testing parsedFilterData', () => {
            beforeEach(async () => {
              mockPFD.mockClear();
              await waitFor(async () => {
                await Button('Test parsed filter data').click();
              });
            });

            it('parsed filter data is as expected', () => {
              expect(mockPFD.mock.calls[0][0]).toEqual(expectedParsedFilterData);
            });
          });
        });
      }
    );
  });

  describe('without active filters', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <DocumentFilter
            activeFilters={{}}
            categoryValues={categoryValues}
            filterHandlers={filterHandlers}
          />,
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('renders the document filters accordion', async () => {
      await Accordion('Documents').exists();
    });

    it('renders DocumentFilterForm component', () => {
      const { getByText } = renderComponent;
      expect(getByText('DocumentFilterForm')).toBeInTheDocument();
    });
  });
  // TODO
  // Add test for passing in/not passing in labels
});
