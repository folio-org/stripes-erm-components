import React from 'react';
import '../../test/jest/__mock__';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';

import { organizationSelection } from './testResources';
import OrganizationSelection from './OrganizationSelection';

jest.mock('./OrganizationSelectionContainer', () => () => <div>OrganizationSelectionContainer</div>);

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

  test('renders OrganizationSelectionContainer component', () => {
    const { getByText } = renderComponent;
    expect(getByText('OrganizationSelectionContainer')).toBeInTheDocument();
  });
});
