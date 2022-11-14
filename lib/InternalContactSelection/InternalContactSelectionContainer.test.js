import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { internalContactSelectionContainer } from './testResources';
import InternalContactSelectionContainer from './InternalContactSelectionContainer';

jest.mock('./InternalContactSelectionDisplay', () => () => <div>InternalContactSelectionDisplay</div>);

let renderComponent;
describe('InternalContactSelectionContainer', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <MemoryRouter>
        <InternalContactSelectionContainer
          {...internalContactSelectionContainer}
        />
      </MemoryRouter>,
      translationsProperties,
    );
  });

  test('renders InternalContactSelectionDisplay component', () => {
    const { getByText } = renderComponent;
    expect(getByText('InternalContactSelectionDisplay')).toBeInTheDocument();
  });

  describe('re-rendering the component', () => { // makes sure that we hit the componentDidUpdate block
    beforeEach(() => {
      renderWithIntl(
        <MemoryRouter>
          <InternalContactSelectionContainer
            {...internalContactSelectionContainer}
          />
        </MemoryRouter>,
        translationsProperties,
        renderComponent.rerender
      );
    });

    test('renders the internalContactSelectionDisplay by id', () => {
      const { getByTestId } = renderComponent;
      expect(getByTestId('internalContactSelectionDisplay')).toBeInTheDocument();
    });
  });
});
