import { MemoryRouter } from 'react-router-dom';
import {
  Field as MockField,
} from 'react-final-form';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { renderWithIntl, Button, TextField } from '@folio/stripes-erm-testing';
import { TextField as MockStripesTextField } from '@folio/stripes/components';


import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilterForm from './DocumentFilterForm';
import { documentFilterParsing } from './testResources';

jest.mock('./DocumentFilterFieldArray', () => () => {
  return (
    // Add text field to make form not pristine, so that we can submit it
    <>
      <MockField
        component={MockStripesTextField}
        label="TESTING"
        name="testing"
      />
      <div>DocumentFilterFieldArray</div>
    </>
  );
});

const onSubmit = jest.fn();
const handlers = {
  closeEditModal: jest.fn(),
  openEditModal: jest.fn(),
};

const filterModalProps = {};

const filterHandlers = {
  state: jest.fn(),
  checkbox: () => {},
  clear: () => {},
  clearGroup: () => {},
  reset: () => {},
};

let renderComponent;
describe('DocumentFilterForm', () => {
  describe('basic functionality', () => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <DocumentFilterForm
            categoryValues={categoryValues}
            filterHandlers={filterHandlers}
            filterModalProps={filterModalProps}
            filterName="docs"
            filters={[]}
            handlers={handlers}
            onSubmit={onSubmit}
          />
        </MemoryRouter>,
        translationsProperties,
      );
    });

    test('renders the document filters button', async () => {
      await Button('Edit document filters').exists();
    });

    test('filter form is not open', async () => {
      const { queryByText } = renderComponent;
      await waitFor(async () => {
        await expect(queryByText('DocumentFilterFieldArray')).not.toBeInTheDocument();
      });
    });

    describe('opening the filter form', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Edit document filters').click();
        });
      });

      test('filter form is open', async () => {
        const { queryByText } = renderComponent;
        await waitFor(async () => {
          await expect(queryByText('DocumentFilterFieldArray')).toBeInTheDocument();
        });
      });
    });
  });

  describe.each([
    {
      filtersInfo: 'simple filters',
      filters: documentFilterParsing.find(dfp => dfp.name === 'simple').parsed,
      expectedSubmit: documentFilterParsing.find(dfp => dfp.name === 'simple').deparsed
    },
    {
      filtersInfo: 'complex filters',
      filters: documentFilterParsing.find(dfp => dfp.name === 'complex').parsed,
      expectedSubmit: documentFilterParsing.find(dfp => dfp.name === 'complex').deparsed
    }
  ])('Testing submit handler for $filtersInfo', ({ filtersInfo, filters, expectedSubmit }) => {
    beforeEach(async () => {
      filterHandlers.state.mockClear();
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <DocumentFilterForm
            categoryValues={categoryValues}
            filterHandlers={filterHandlers}
            filterModalProps={filterModalProps}
            filterName="docs"
            filters={filters}
            handlers={handlers}
            onSubmit={onSubmit}
          />
          ,
        </MemoryRouter>,
        translationsProperties
      );
    });

    describe('opening the filter form', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Edit document filters').click();
        });
      });

      it('should open the document filter builder modal when the edit button is clicked', async () => {
        const { getByText } = renderComponent;
        await waitFor(async () => {
          await Button('Edit document filters').click();
        });
        expect(getByText('Document filter builder')).toBeInTheDocument();
      });

      describe('making form dirty for submittal', () => {
        beforeEach(async () => {
          // Make form submittable
          await waitFor(async () => {
            await TextField('TESTING').fillIn('testing');
          });
        });

        test('save and close button is enabled', async () => {
          await waitFor(async () => {
            await Button('ui-test-implementor.saveAndClose').exists();
          });
        });

        it('should display the cancel button when the filter form is open', async () => {
          await waitFor(async () => {
            await Button('ui-test-implementor.cancel').exists();
          });
        });

        describe('clicking cancel button', () => {
          beforeEach(async () => {
            await waitFor(async () => {
              await Button('ui-test-implementor.cancel').click();
            });
          });

          it('should close the filter form', async () => {
            const { queryByText } = renderComponent;
            await waitFor(async () => {
              await expect(queryByText('DocumentFilterFieldArray')).not.toBeInTheDocument();
            });
          });
        });

        describe('submitting form', () => {
          beforeEach(async () => {
            // Submit form
            await waitFor(async () => {
              // There is no translation for this across stripes-erm-components rn, so no use for intlKey.
              await Button('ui-test-implementor.saveAndClose').click();
            });
          });

          test(`submit handler acted as expected for ${filtersInfo}`, async () => {
            await waitFor(async () => {
              await expect(filterHandlers.state.mock.calls[0][0]).toEqual(expectedSubmit);
            });
          });

          test('filter form is not open', async () => {
            const { queryByText } = renderComponent;
            await waitFor(async () => {
              await expect(queryByText('DocumentFilterFieldArray')).not.toBeInTheDocument();
            });
          });
        });
      });
    });
  });
});