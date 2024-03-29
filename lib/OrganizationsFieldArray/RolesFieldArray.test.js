import React from 'react';
import { FieldArray } from 'react-final-form-arrays';

import userEvent from '@folio/jest-config-stripes/testing-library/user-event';

import {
  renderWithIntl,
  Button,
  Select,
  TextArea,
  TestForm
} from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { filledInitialRoleValues, rolesFieldArrayProps } from './testResources';
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
              roles: filledInitialRoleValues
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
