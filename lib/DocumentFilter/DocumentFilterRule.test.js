import { MemoryRouter } from 'react-router-dom';
import { Field } from 'react-final-form';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Button,
  TestForm,
  testSelect
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilterRule from './DocumentFilterRule';

const onSubmit = jest.fn();
const onDelete = jest.fn();
const value = {
  'path': 'docs.name',
  'comparator': '==',
  'value': 'test',
};

let renderComponent;
describe('DocumentFilterRule', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
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

  it('renders the submit button', async () => {
    await Button('Submit').exists();
  });

  // EXAMPLE testing select options with a centralised testSelect method
  describe.each([
    {
      selector: { name: 'filters[0].rules[0].path' },
      selectorName: 'Attribute',
      optionsArray: [
        'Name',
        'Note',
        'Physical location',
        'URL',
        'Content type',
        'File name',
        ''
      ]
    },
    {
      selector: { name: 'filters[0].rules[0].comparator' },
      selectorName: 'Comparator',
      optionsArray: [
        'is',
        'contains',
        'does not contain',
        ''
      ]
    }
  ])('$selectorName select', (options) => {
    testSelect(options);
  });

  let removeButton;
  describe('DocumentFilterRule with more than one rule', () => {
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <TestForm onSubmit={onSubmit}>
            <Field
              name="filters[0].rules[1]"
            >
              {({ input: { name } }) => (
                <DocumentFilterRule
                  ariaLabelledby="selected-document-item-name-0"
                  categoryValues={categoryValues}
                  index={1}
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
      const { getByRole } = renderComponent;
      removeButton = getByRole('button', { name: 'Remove rule 2' });
    });

    it('renders the submit button', async () => {
      await Button('Submit').exists();
    });

    test('removing rules using the remove button works as expected', async () => {
      const { getByRole } = renderComponent;
      // IconButton calls not working right now
      // await Tooltip('Remove rule 2').exists();
      expect(getByRole('tooltip', { name: /remove rule 2/i })).toBeInTheDocument();
    });

    test('if onDelete function will be called', async () => {
      await waitFor(async () => {
        await removeButton.click();
        // IconButton calls not working right now
        // await Tooltip('Remove rule 2').click();
        await expect(onDelete).toHaveBeenCalled();
      });
    });
  });
});
