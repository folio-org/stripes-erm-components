import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { Selection, SelectionList as SelectListInteractor } from '@folio/stripes-testing';
import { renderWithIntl } from '../../test/jest/helpers';

import translationsProperties from '../../tests/helpers/translationsProperties';
import { internalContactSelectionDisplay } from './testResources';
import InternalContactSelectionDisplay from './InternalContactSelectionDisplay';

jest.mock('./InternalContactSelectionContainer', () => () => <div>InternalContactSelectionContainer</div>);

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

  test('renders stripes-components.selection.controlLabel', () => {
    const { getByText } = renderComponent;
    expect(getByText('stripes-components.selection.controlLabel')).toBeInTheDocument();
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
    await Selection({ id: 'agreement-internal-contacts-filter' }).exists();
    await Selection().open();
    await SelectListInteractor({ optionCount: 4 }).exists();
  });
});
