import React from 'react';
import { StaticRouter as Router } from 'react-router-dom';
import { renderWithIntl } from '@folio/stripes-erm-testing';
import { translationsProperties } from '../../test/jest/helpers';

import { internalContactSelection } from './testResources';
import InternalContactSelection from './InternalContactSelection';

jest.mock('./InternalContactSelectionContainer', () => () => <div>InternalContactSelectionContainer</div>);

let renderComponent;
describe('InternalContactSelection', () => {
  beforeEach(() => {
    renderComponent = renderWithIntl(
      <Router>
        <InternalContactSelection
          {...internalContactSelection}
        />
      </Router>,
      translationsProperties
    );
  });

  test('renders InternalContactSelectionContainer component', () => {
    const { getByText } = renderComponent;
    expect(getByText('InternalContactSelectionContainer')).toBeInTheDocument();
  });
});
