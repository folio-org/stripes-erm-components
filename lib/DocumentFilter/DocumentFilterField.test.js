import { MemoryRouter } from 'react-router-dom';
import { FieldArray } from 'react-final-form-arrays';

import { renderWithIntl, Button, TestForm } from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilterField from './DocumentFilterField';
import { documentFilterParsing } from './testResources';

const onSubmit = jest.fn();

// These should be centralised
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
describe('DocumentFilterField', () => {
  describe.each([
    {
      initalFilters: documentFilterParsing.find(dfp => dfp.name === 'complex').parsed,
      expectedFields: 2
    },
    {
      initalFilters: documentFilterParsing.find(dfp => dfp.name === 'simple').parsed,
      expectedFields: 1
    },
    {
      initalFilters: [],
      expectedFields: 0
    }
  ])('Render DocumentFilterField with $expectedFields in the array', ({ initalFilters, expectedFields }) => {
    beforeEach(() => {
      renderComponent = renderWithIntl(
        <MemoryRouter>
          <TestForm
            initialValues={{
              filters: initalFilters
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
              ))}
            </FieldArray>
          </TestForm>
          ,
        </MemoryRouter>,
        translationsProperties
      );
    });

    it('displays attibute label(s)', () => {
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
      test('renders the add rule button', async () => {
        await Button('Add rule').exists();
      });
      // TODO Mock DocumentFilterRule and check that you can add rules, that the right number show up and that they're separated by ANDs
    }
  });
});
