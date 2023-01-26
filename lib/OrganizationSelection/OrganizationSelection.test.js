import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';

import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { organizationSelection } from './testResources';
import OrganizationSelection from './OrganizationSelection';

jest.mock('./OrganizationSelectionDisplay', () => () => <div>OrganizationSelectionDisplay</div>);

let renderComponent;
describe('OrganizationSelection', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <OrganizationSelection
          {...organizationSelection}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders OrganizationSelectionDisplay component', () => {
    const { getByText } = renderComponent;
    expect(getByText('OrganizationSelectionDisplay')).toBeInTheDocument();
  });
});
