import { Accordion, renderWithIntl, Selection, SelectionOption, Spinner } from '@folio/stripes-erm-testing';

import { useDoAccessControl, useReadPolicies } from '../../hooks';
import {
  AUPolicyRestrictCreateMember,
  flattenedReadPolicies as mockReadPolicies
} from '../../../../test/jest/resources';
import { translationsProperties } from '../../../../test/jest/helpers';

import { SimpleAccessControlFilter } from '../index';

jest.unmock('@folio/stripes-components');

jest.mock('../../hooks', () => ({
  useDoAccessControl: jest.fn(),
  useReadPolicies: jest.fn(),
}));

const filterHandlers = {
  state: jest.fn()
};

describe('SimpleAccessControlFilter', () => {
  describe.each([
    {
      testLabel: 'basic implementation'
    },
    {
      testLabel: 'disabled = true',
      disabled: true,
    },
    {
      testLabel: 'isLoading',
      doAccessControlMockImplementation: () => ({ doAccessControl: true, enabledEnginesQuery: { isLoading: true } }),
      isLoading: true,
    },
    {
      testLabel: 'with accessControlEndpoint = \'/wibble\'',
      accessControlEndpoint: '/wibble',
    },
    {
      testLabel: 'with filterLabel',
      filterLabel: 'TEST FILTER LABEL',
      expectedAccordionLabel: 'TEST FILTER LABEL',
    }
  ])('$testLabel', ({
    accessControlEndpoint = '/testing',
    disabled = false,
    filterLabel,
    expectedAccordionLabel = 'Acquisition unit',
    startingActiveFilters = [],
    isLoading = false,
    doAccessControlMockImplementation,
    readPoliciesMockImplementation
  }) => {
    beforeEach(() => {
      filterHandlers.state.mockClear();
      useReadPolicies.mockClear();
      if (readPoliciesMockImplementation) {
        useReadPolicies.mockImplementation(readPoliciesMockImplementation);
      } else {
        useReadPolicies.mockImplementation(() => ({ flattenedPolicies: mockReadPolicies }));
      }
      useDoAccessControl.mockClear();
      if (doAccessControlMockImplementation) {
        useDoAccessControl.mockImplementation(doAccessControlMockImplementation);
      } else {
        useDoAccessControl.mockImplementation(() => ({ doAccessControl: true, enabledEnginesQuery: { isLoading: false } }));
      }

      renderWithIntl(
        <SimpleAccessControlFilter
          accessControlEndpoint={accessControlEndpoint}
          activeFilters={startingActiveFilters}
          disabled={disabled}
          filterHandlers={filterHandlers}
          filterLabel={filterLabel}
        />,
        translationsProperties,
      );
    });

    test.each([
      {
        hookName: 'useReadPolicies',
        hookMock: useReadPolicies,
      },
      {
        hookName: 'useDoAccessControl',
        hookMock: useDoAccessControl,
      }
    ])(`$hookName was called with access control endpoint: ${accessControlEndpoint}`, ({ hookMock }) => {
      expect(hookMock.mock.calls[0][0].endpoint).toEqual(accessControlEndpoint);
    });

    if (disabled) {
      test('does not render Accordion', async () => {
        await Accordion().absent();
      });
    } else {
      test('renders Accordion with expected label', async () => {
        await Accordion(expectedAccordionLabel).exists();
      });

      if (isLoading) {
        // Test spinners with Accordion open and closed
        test('renders loading spinner in accordion', async () => {
          await Accordion(expectedAccordionLabel).find(Spinner()).exists();
        });

        describe('clicking on accordion', () => {
          beforeEach(async () => {
            await Accordion().click();
          });

          test('renders loading spinner in accordion', async () => {
            await Accordion(expectedAccordionLabel).find(Spinner()).exists();
          });
        });
      }

      test('renders Selection', async () => {
        await Selection().exists();
      });

      describe('opening Selection', () => {
        beforeEach(async () => {
          await Selection().open();
        });

        if (isLoading) {
          // If loading, we render a spinner only
          test('renders loading spinner in selection', async () => {
            await SelectionOption().find(Spinner()).exists();
          });
        } else {
          test.each([
            'No acquisition unit',
            ...mockReadPolicies.map((policy) => policy.policy.name),
          ])('Selection option %s exists', async (selectionOption) => {
            await SelectionOption(selectionOption).exists();
          });

          describe('Selecting an option', () => {
            beforeEach(async () => {
              await Selection().choose(AUPolicyRestrictCreateMember.name);
            });

            test('filterHandlers state got called with expected values', () => {
              expect(filterHandlers.state.mock.calls[0]).toEqual([{ policiesFilter: [`ACQ_UNIT:${AUPolicyRestrictCreateMember.id}`] }]);
            });
          });
        }
      });
    }
  });
});
