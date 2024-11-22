import { MemoryRouter } from 'react-router-dom';
import { FieldArray } from 'react-final-form-arrays';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import { renderWithIntl, TestForm, Button } from '@folio/stripes-erm-testing';

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
      initialFilters: [],
      expectedFields: 0,
      expectedRules: 0,
    },
    {
      initialFilters: documentFilterParsing.find((dfp) => dfp.name === 'simple')
        .parsed,
      expectedFields: 1,
      expectedRules: 1,
    },
    {
      initialFilters: documentFilterParsing.find((dfp) => dfp.name === 'complex')
        .parsed,
      expectedFields: 2,
      expectedRules: 3,
    },
  ])(
    'Render $expectedFields DocumentFilterField component(s)',
    ({ initialFilters, expectedFields, expectedRules }) => {
      beforeEach(() => {
        renderComponent = renderWithIntl(
          <MemoryRouter>
            <TestForm
              initialValues={{
                filters: initialFilters,
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

      describe('DocumentFilterRule interactions', () => {
        it(`renders ${expectedRules} DocumentFilterRule component${expectedRules !== 1 ? 's' : ''}`, () => {
          const { queryAllByText } = renderComponent;
          expect(queryAllByText('DocumentFilterRule')).toHaveLength(expectedRules);
        });

        if (expectedFields === 0) {
          it('does not render the add rule button', async () => {
            await Button('Add rule').absent();
          });
        } else {
          describe('clicking add rule button', () => {
            beforeEach(async () => {
              await waitFor(async () => {
                // There will be multiple add rules for multiple DocumentFilterFields
                await Button({ id: 'add-rule-button-filters[0]' }).click();
              });
            });

            test('a rule has been added', async () => {
              const { queryAllByText } = renderComponent;
              await waitFor(() => {
                expect(queryAllByText('DocumentFilterRule')).toHaveLength(expectedRules + 1);
              });
            });
          });
        }
      });
    }
  );
});
