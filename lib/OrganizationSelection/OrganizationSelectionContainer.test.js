import React from 'react';
import '../../test/jest/__mock__';
import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '../../test/jest/helpers';
import translationsProperties from '../../tests/helpers/translationsProperties';

import { organizationSelectionContainer } from './testResources';
import OrganizationSelectionContainer from './OrganizationSelectionContainer';

jest.mock('./OrganizationSelectionDisplay', () => () => <div>OrganizationSelectionDisplay</div>);

let renderComponent;
describe('OrganizationSelectionContainer', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <OrganizationSelectionContainer
          {...organizationSelectionContainer}
        />
      </MemoryRouter>,
      translationsProperties,
    );
  });

  test('renders OrganizationSelectionDisplay component', () => {
    const { getByText } = renderComponent;
    expect(getByText('OrganizationSelectionDisplay')).toBeInTheDocument();
  });

  describe('re-rendering the component', () => { // makes sure that we hit the componentDidUpdate block
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <OrganizationSelectionContainer
            {...organizationSelectionContainer}
          />
        </MemoryRouter>,
        translationsProperties,
        renderComponent.rerender
      );
    });

    test('renders the organizationSelectionDisplay by id', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('organizationSelectionDisplay')).toBeInTheDocument();
    });
  });
});
