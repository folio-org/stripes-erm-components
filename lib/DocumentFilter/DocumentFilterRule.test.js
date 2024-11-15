import { MemoryRouter } from 'react-router-dom';
import { Field } from 'react-final-form';
import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Button,
  TestForm,
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


  it('renders the correct options in the Attribute dropdown', async () => {
    const { getAllByRole } = renderComponent;
    const options = getAllByRole('option');

    expect(options[0]).toHaveTextContent('');
    expect(options[1]).toHaveTextContent('Name');
    expect(options[2]).toHaveTextContent('Note');
    expect(options[3]).toHaveTextContent('Physical location');
    expect(options[4]).toHaveTextContent('URL');
    expect(options[5]).toHaveTextContent('Content type');
    expect(options[6]).toHaveTextContent('File name');
  });

  it('renders the correct options in the Comparator dropdown', async () => {
    const { getAllByRole } = renderComponent;
    const options = getAllByRole('option');

    expect(options[7]).toHaveTextContent('');
    expect(options[8]).toHaveTextContent('is');
    expect(options[9]).toHaveTextContent('contains');
    expect(options[10]).toHaveTextContent('does not contain');
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
