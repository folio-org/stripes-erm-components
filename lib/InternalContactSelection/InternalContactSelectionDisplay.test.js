import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { waitFor } from '@folio/jest-config-stripes/testing-library/react';

import {
  renderWithIntl,
  Selection,
  SelectionList as SelectListInteractor
} from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';
import { internalContactSelectionDisplay } from './testResources';

let renderComponent;
describe('InternalContactSelectionDisplay', () => {
  beforeEach(async () => {
    renderComponent = renderWithIntl(
      <Router>
        <InternalContactSelectionDisplay
          {...internalContactSelectionDisplay}
        />
      </Router>,
      translationsProperties
    );

    const selection = Selection({ id: 'agreement-internal-contacts-filter' });

    await selection.exists();
    await waitFor(async () => {
      await selection.open();
    });
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

  test('renders intenal contact option(s)', async () => {
    const { getByText } = renderComponent;
    await waitFor(async () => {
      expect(getByText('Becker, Kaylee Zola')).toBeInTheDocument();
      expect(getByText('Admin, acq-manager')).toBeInTheDocument();
      expect(getByText('Admin, acq-admin')).toBeInTheDocument();
      expect(getByText('Davis, Jodie')).toBeInTheDocument();
    });
  });

  it('correct number of internal contact role options rendered', async () => {
    await SelectListInteractor({ optionCount: 4 }).exists();
  });
});
