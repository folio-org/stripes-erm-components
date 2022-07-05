import React from 'react';
import '../../test/jest/__mock__';
import { Button } from '@folio/stripes-testing';
import { renderWithIntl, TestForm } from '../../test/jest/helpers';

import translationsProperties from '../../tests/helpers/translationsProperties';
import { editOrgCardProps } from './testResources';
import EditOrganizationCard from './EditOrganizationCard';

jest.mock('../ViewOrganizationCard', () => () => <div>ViewOrganizationCard</div>);
jest.mock('./RolesFieldArray', () => () => <div>RolesFieldArray</div>);
jest.mock('./FieldPrimaryOrg', () => () => <div>FieldPrimaryOrg</div>);

const onSubmit = jest.fn();

let renderComponent;
describe('EditOrganizationCard', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <TestForm
        onSubmit={onSubmit}
      >
        <EditOrganizationCard
          {...editOrgCardProps}
        />
      </TestForm>,
      translationsProperties
    );
  });

  test('renders the EditCard by id', () => {
    const { getByTestId } = renderComponent;
    expect(getByTestId('editCard')).toBeInTheDocument();
  });

  test('displays Organization 1 header', () => {
    const { getByText } = renderComponent;
    expect(getByText('Organization 1')).toBeInTheDocument();
  });

  it('renders FieldPrimaryOrg component', () => {
    const { getByText } = renderComponent;
    expect(getByText('FieldPrimaryOrg')).toBeInTheDocument();
  });

  it('renders Remove organization 1 tooltip', () => {
    const { getByText } = renderComponent;
    expect(getByText('Remove organization 1')).toBeInTheDocument();
  });

  it('renders ViewOrganizationCard component', () => {
    const { getByText } = renderComponent;
    expect(getByText('ViewOrganizationCard')).toBeInTheDocument();
  });

  it('renders Note label', () => {
    const { getByText } = renderComponent;
    expect(getByText('Note')).toBeInTheDocument();
  });

  it('renders RolesFieldArray component', () => {
    const { getByText } = renderComponent;
    expect(getByText('RolesFieldArray')).toBeInTheDocument();
  });

  test('renders the Submit button', async () => {
    await Button('Submit').exists();
  });
});

