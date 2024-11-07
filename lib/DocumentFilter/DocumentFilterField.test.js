import { MemoryRouter } from 'react-router-dom';
import { FieldArray } from 'react-final-form-arrays';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilterField from './DocumentFilterField';
import { documentFilterParsing } from './testResources';

const onSubmit = jest.fn();
jest.mock('./DocumentFilterRule', () => () => <div>DocumentFilterRule</div>);

let renderComponent;
describe('DocumentFilterField', () => {
  describe.each([
    {
      initalFilters: documentFilterParsing.find((dfp) => dfp.name === 'complex')
        .parsed,
      expectedFields: 2,
    },
    {
      initalFilters: documentFilterParsing.find((dfp) => dfp.name === 'simple')
        .parsed,
      expectedFields: 1,
    },
    {
      initalFilters: [],
      expectedFields: 0,
    },
  ])(
    'Render DocumentFilterField with $expectedFields in the array',
    ({ initalFilters, expectedFields }) => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
          <MemoryRouter>
            <TestForm
              initialValues={{
                filters: initalFilters,
              }}
              onSubmit={onSubmit}
            >
              <FieldArray name="filters">
                {({ fields }) => fields.map((name, index) => (
                  <DocumentFilterField
                    key={`${name}[${index}]`}
                    categoryValues={categoryValues}
                    filterName="docs"
                    index={index}
                    name={name}
                  />
                ))
                }
              </FieldArray>
            </TestForm>
            ,
          </MemoryRouter>,
          translationsProperties
        );
      });

      it('displays attribute label(s)', () => {
        const { queryAllByText } = renderComponent;
        expect(queryAllByText('Attribute')).toHaveLength(expectedFields);
      });

      it('displays operator label(s)', () => {
        const { queryAllByText } = renderComponent;
        expect(queryAllByText('Operator')).toHaveLength(expectedFields);
      });

      it('displays value label(s)', () => {
        const { queryAllByText } = renderComponent;
        expect(queryAllByText('Value')).toHaveLength(expectedFields);
      });

      if (expectedFields > 0) {
        it('renders the add rule button', async () => {
          await Button('Add rule').exists();
        });
        // TODO Mock DocumentFilterRule and check that you can add rules, that the right number show up and that they're separated by ANDs

        // it('renders DocumentFilterRule component the correct number of times after clicking the add rule button', async () => {
        //   const { getAllByText } = renderComponent;
        //   await waitFor(async () => {
        //     await Button('Add rule').click();
        //   });
        //   expect(getAllByText('DocumentFilterRule')).toHaveLength(expectedFields);
        // });
      }
    }
  );
});
