import { waitFor } from '@folio/jest-config-stripes/testing-library/react';
import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { renderWithIntl, Selection, SelectionList as SelectListInteractor } from '@folio/stripes-erm-testing';

import OrganizationSelectionDisplay from './OrganizationSelectionDisplay';
import { organizationSelectionDisplay } from './testResources';

import { translationsProperties } from '../../test/jest/helpers';

let renderComponent;
describe('OrganizationSelectionDisplay', () => {
  let selection;
  beforeEach(async () => {
    renderComponent = renderWithIntl(
      <Router>
        <OrganizationSelectionDisplay
          {...organizationSelectionDisplay}
        />
      </Router>,
      translationsProperties
    );

    selection = Selection({ id: 'test-id' }); // This id is passed in testResources... I don't like this pattern

    await selection.exists();
  });

  test('renders Select control', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select control')).toBeInTheDocument();
  });

  test('renders expected placeholder', () => {
    const { getByText } = renderComponent;
    expect(getByText('Select an organization')).toBeInTheDocument();
  });

  test('renders the expected button name', () => {
    const { getByRole } = renderComponent;
    expect(getByRole('button', { name: 'Select an organization' }));
  });

  describe('Opening the selection', () => {
    beforeEach(async () => {
      await waitFor(async () => {
        await selection.open();
      });
    });

    it('The right number of options exist', async () => {
      await SelectListInteractor({ optionCount: 37 }).exists();
    });

    test.each([
      { orgName: 'American Chemical Society' },
      { orgName: 'American Institute of Aeronautics and Astronautics' },
      { orgName: 'American Medical Association' },
      { orgName: 'American Psychiatric Publishing' },
      { orgName: 'American Society of Civil Engineers' },
      { orgName: 'American Vacuum Society' },
    ])('renders organisation name $orgName', async ({ orgName }) => {
      const { getByText } = renderComponent;
      await waitFor(async () => {
        expect(getByText(orgName)).toBeInTheDocument();
      });
    });
  });
});
