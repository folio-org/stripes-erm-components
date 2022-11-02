import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { Selection, SelectionList as SelectListInteractor } from '@folio/stripes-testing';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { organizationSelectionDisplay } from './testResources';
import OrganizationSelectionDisplay from './OrganizationSelectionDisplay';


let renderComponent;
describe('OrganizationSelectionDisplay', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <OrganizationSelectionDisplay
          {...organizationSelectionDisplay}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders stripes-components.selection.controlLabel', () => {
    const { getByText } = renderComponent;
    expect(getByText('stripes-components.selection.controlLabel')).toBeInTheDocument();
  });

  test('renders Select an organization button', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select an organization')).toBeInTheDocument();
  });

  test('renders the expected button name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Select an organization' }));
  });

  test('renders organization name', () => {
    const { getByText } = renderComponent;
    expect(getByText('American Chemical Society')).toBeInTheDocument();
  });

  test('renders organization name', () => {
    const { getByText } = renderComponent;
    expect(getByText('American Institute of Aeronautics and Astronautics')).toBeInTheDocument();
  });

  test('renders organization name', () => {
    const { getByText } = renderComponent;
    expect(getByText('American Medical Association')).toBeInTheDocument();
  });

  test('renders organization name', () => {
    const { getByText } = renderComponent;
    expect(getByText('American Psychiatric Publishing')).toBeInTheDocument();
  });

  it('choosing an organization role option', async () => {
    await Selection({ id: 'stripes-selection-8' }).exists();
    await Selection().open();
    await SelectListInteractor({ optionCount: 37 }).exists();
  });
});
