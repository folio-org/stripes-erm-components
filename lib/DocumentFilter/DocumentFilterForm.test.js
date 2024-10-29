import { MemoryRouter } from 'react-router-dom';

import {
  Field as MockField,
} from 'react-final-form';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, Button, TextField } from '@folio/stripes-erm-testing';
import { TextField as MockStripesTextField } from '@folio/stripes/components';


import { translationsProperties } from '../../test/jest/helpers';
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
// TODO these should be centralised
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

    test('filter form is not open', () => {
      const { queryByText } = renderComponent;
      expect(queryByText('DocumentFilterFieldArray')).not.toBeInTheDocument();
    });

    describe('opening the filter form', () => {
      beforeEach(async () => {
        await waitFor(async () => {
          await Button('Edit document filters').click();
        });
      });

      test('filter form is open', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('DocumentFilterFieldArray')).toBeInTheDocument();
      });
    });
  });

  // TODO these are borrowed as outputs from DocumentFilter.test.js... should probs be centralised in a way that makes sense.
  // Maybe the helper functions live in their own components for testing?
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

      test('filter form is open', () => {
        const { queryByText } = renderComponent;
        expect(queryByText('DocumentFilterFieldArray')).toBeInTheDocument();
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

        describe('submitting form', () => {
          beforeEach(async () => {
            // Submit form
            await waitFor(async () => {
              // screen.debug();
              // There is no translation for this across stripes-erm-components rn, so no use for intlKey.
              await Button('ui-test-implementor.saveAndClose').click();
            });
          });

          test(`submit handler acted as expected for ${filtersInfo}`, () => {
            expect(filterHandlers.state.mock.calls[0][0]).toEqual(expectedSubmit);
          });

          test('filter form is not open', () => {
            const { queryByText } = renderComponent;
            expect(queryByText('DocumentFilterFieldArray')).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
