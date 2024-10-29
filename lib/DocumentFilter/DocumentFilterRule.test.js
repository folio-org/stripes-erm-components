import { MemoryRouter } from 'react-router-dom';
import { Field } from 'react-final-form';

import {
  renderWithIntl,
  Button,
  TestForm,
  TextArea,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import DocumentFilterRule from './DocumentFilterRule';

TextArea('Name').exists();

const onSubmit = jest.fn();
const onDelete = jest.fn();
const value = {
  'path': 'docs.name',
  'comparator': '==',
  'value': 'test',
};

describe('DocumentFilterRule', () => {
  beforeEach(() => {
    renderWithIntl(
      <MemoryRouter>
        <TestForm onSubmit={onSubmit}>
          <Field
            name="filters[0].rules[0]"
          >
            {({ input: { name } }) => (
              <DocumentFilterRule
                ariaLabelledby="selected-document-item-name-0"
                categoryValues={[]}
                index={0}
                name={name}
                onDelete={onDelete}
                value={value}
              />
            )}
          </Field>
        </TestForm>
        ,
      </MemoryRouter>,
      translationsProperties
    );
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });

  it('renders Name option', () => {
    TextArea('Name').exists();
  });

  it('renders Note option', () => {
    TextArea('Note').exists();
  });

  it('renders Physical location option', () => {
    TextArea('Physical location').exists();
  });

  // TODO this is not how we check select options
  it('renders URL option', () => {
    TextArea('URL').exists();
  });

  it('renders Content type option', () => {
    TextArea('Content type').exists();
  });

  it('renders File name option', () => {
    TextArea('File name').exists();
  });

  it('renders Category option', () => {
    TextArea('Category').exists();
  });

  it('renders is option', () => {
    TextArea('is').exists();
  });

  it('renders containes option', () => {
    TextArea('containes').exists();
  });

  it('renders does not contain option', () => {
    TextArea('does not contain').exists();
  });

  // TODO check Delete button renders for index > 0 and calls onDelete as expected and does NOT render for index 0
  // Test that value is normally a TextField
  // Test that selecting category makes:
  // the comparator a Select with is vs is not
  // the value a Select with expected options (categoryvalues from some centralised test resources)

  // Also please test DocumentFilterRuleConstants returns what you expect for ALL occasions
});
