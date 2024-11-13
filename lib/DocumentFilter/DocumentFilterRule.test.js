import { MemoryRouter } from 'react-router-dom';
import { Field } from 'react-final-form';
import { screen, waitFor } from '@folio/jest-config-stripes/testing-library/react';
import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import {
  renderWithIntl,
  Button,
  TestForm,
  TextArea,
} from '@folio/stripes-erm-testing';

import { translationsProperties } from '../../test/jest/helpers';
import { categoryValues } from '../../test/jest/resources';
import DocumentFilterRule from './DocumentFilterRule';

jest.mock('./DocumentFilterRuleConstants', () => () => <div>DocumentFilterRuleConstants</div>);
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

  it('renders the correct options for the Attribute dropdown', async () => {
    TextArea('Name').exists();
    TextArea('Note').exists();
    TextArea('Category').exists();
    TextArea('Physical location').exists();
    TextArea('URL').exists();
    TextArea('Content type').exists();
    TextArea('File name').exists();
  });

  it('renders the correct options for the Comparator dropdown', async () => {
    TextArea('is').exists();
    TextArea('containes').exists();
    TextArea('does not contain').exists();
  });


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
    });

    it('renders the submit button', async () => {
      await Button('Submit').exists();
    });

    test('removing rules using the remove button works as expected', async () => {
      const { getByRole } = renderComponent;
      expect(getByRole('button', { name: /remove rule 2/i })).toBeInTheDocument();
    });

    test('if onDelete function will be called', async () => {
      const deleteButton = screen.getByLabelText('Remove rule 2');
      expect(deleteButton).toBeInTheDocument();
      await waitFor(async () => {
        await userEvent.click(deleteButton);
        await expect(onDelete).toHaveBeenCalled();
      });
    });
  });
});
