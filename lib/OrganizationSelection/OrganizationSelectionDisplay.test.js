import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { renderWithIntl, Selection, SelectionList as SelectListInteractor } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import OrganizationSelectionDisplay from './OrganizationSelectionDisplay';
import { organizationSelectionDisplay } from './testResources';


let renderComponent;
describe('OrganizationSelectionDisplay', () => {
  beforeEach(async () => {
    renderComponent = renderWithIntl(
      <Router>
        <OrganizationSelectionDisplay
          {...organizationSelectionDisplay}
        />
      </Router>,
      translationsProperties
    );

    const selection = Selection({ id: 'test-id' }); // This id is passed in testResources... I don't like this pattern

    await selection.exists();
    await waitFor(async () => {
      await selection.open();
    });
  });

  test('renders Select control', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select control')).toBeInTheDocument();
  });

  test('renders Select an organization button', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select an organization')).toBeInTheDocument();
  });

  test('renders the expected button name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Select an organization' }));
  });

  test('renders organization name(s)', async () => {
    const { getByText } = renderComponent;
    await waitFor(async () => {
      expect(getByText('American Chemical Society')).toBeInTheDocument();
      expect(getByText('American Institute of Aeronautics and Astronautics')).toBeInTheDocument();
      expect(getByText('American Medical Association')).toBeInTheDocument();
      expect(getByText('American Psychiatric Publishing')).toBeInTheDocument();
      expect(getByText('American Society of Civil Engineers')).toBeInTheDocument();
      expect(getByText('American Vacuum Society')).toBeInTheDocument();
    });
  });

  it('The right number of options exist', async () => {
    await SelectListInteractor({ optionCount: 37 }).exists();
  });
});
