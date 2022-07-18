import React from 'react';
import '../../test/jest/__mock__';

import { FieldArray } from 'react-final-form-arrays';

import {
  Button,
  Select,
  TextArea,
} from '@folio/stripes-testing';
import { screen } from '@testing-library/dom'

import userEvent from '@testing-library/user-event';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';

import { rolesFieldArrayProps } from './testResources';
import translationsProperties from '../../tests/helpers/translationsProperties';
import RolesFieldArray from './RolesFieldArray';


const onSubmit = jest.fn();

let renderComponent;
describe('RolesFieldArray', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        initialValues={{
          orgs: [
            {
              roles: [{
                'id': 'c78a7ae1-df96-4022-b512-77c4899e12c0',
                'owner': {
                  'id': 'a6574b84-5e43-4941-964e-6722c3ce604e'
                },
                'role': {
                  'id': '2c91809c81c972dd0181c979cb2b004f',
                  'value': 'content_provider',
                  'label': 'Content provider'
                },
                'note': 'This is a note for the American Chemical Society organization.'
              }]
            }
          ]
        }}
        onSubmit={onSubmit}
      >
        <FieldArray
          component={RolesFieldArray}
          name="orgs[0].roles"
          {...rolesFieldArrayProps}
        />
      </TestForm>, translationsProperties
    );
  });

  test('renders the Add role button', async () => {
    await Button('Add role').exists();
  });

  test('renders the submit button', async () => {
    await Button('Submit').exists();
  });

  it('renders expected role with selected option', async () => {
    Select('Role').choose('Content provider');
  });

  it('renders Note field', () => {
    TextArea('Note').exists();
  });

  it('adding/removing fields using the add/remove works as expected', () => {
    const { getByRole, queryAllByTestId } = renderComponent;
    expect(getByRole('button', { name: 'Add role' })).toBeInTheDocument();
    userEvent.click(getByRole('button', { name: 'Add role' }));
    expect(queryAllByTestId(/rolesFieldArray\[.*\]/i).length).toEqual(1);
  });
});
