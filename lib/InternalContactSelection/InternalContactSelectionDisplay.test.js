import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Selection,
  SelectionList as SelectListInteractor
} from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { internalContactSelectionDisplay } from './testResources';
import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';

let renderComponent;
describe('InternalContactSelectionDisplay', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <InternalContactSelectionDisplay
          {...internalContactSelectionDisplay}
        />
      </Router>,
      translationsProperties
    );
  });


  test('renders Select control', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select control')).toBeInTheDocument();
  });

  test('renders Select an internal contact button', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select an internal contact')).toBeInTheDocument();
  });

  test('renders the expected button name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Select an internal contact' }));
  });

  test('renders intenal contact name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Becker, Kaylee Zola')).toBeInTheDocument();
  });

  test('renders intenal contact name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Admin, acq-manager')).toBeInTheDocument();
  });

  test('renders intenal contact name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Admin, acq-admin')).toBeInTheDocument();
  });

  test('renders intenal contact name', () => {
    const { getByText } = renderComponent;
    expect(getByText('Davis, Jodie')).toBeInTheDocument();
  });

  it('choosing an internal contact role option', async () => {
    const selection = Selection({ id: 'agreement-internal-contacts-filter' });

    await selection.exists();
    await waitFor(async () => {
      await selection.open();
    });
    await SelectListInteractor({ optionCount: 4 }).exists();
  });
});
